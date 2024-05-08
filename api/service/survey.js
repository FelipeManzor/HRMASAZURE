import { getDB } from "../db/db.js";
import {
  survey,
  response,
  questionSetDetail,
  questionSet,
  industry,
} from "../db/schema.js";
import { ne, eq, count, and, isNull } from "drizzle-orm";
import NotFoundError from "../errors/notfound.js";
import ForbiddenError from "../errors/forbidden.js";
import SurveyStatus from "../const/survey-status.js";
import encrypt from "../util/encrypt.js";

/**
 * get survey list according to archive state
 * @param {*} isArchived
 * @returns
 */
export async function GetSurveyList(isArchived) {
  return await getDB()
    .select({
      id: survey.id,
      name: survey.name,
      companyName: survey.companyName,
      principal: survey.principal,
      startDate: survey.startDate,
      industryName: industry.name,
      headcount: survey.headcount,
      questionSetId: survey.questionSetId,
      questionSetName: questionSet.name,
    })
    .from(survey)
    .leftJoin(questionSet, eq(questionSet.id, survey.questionSetId))
    .leftJoin(industry, eq(industry.id, survey.industryId))
    .where(
      isArchived
        ? eq(survey.status, SurveyStatus.ARCHIVED)
        : ne(survey.status, SurveyStatus.ARCHIVED)
    );
}

export async function GetSurveyDetailById(id) {
  const result = await getDB()
  .select({
    id: survey.id,
    name: survey.name,
    description: survey.description,
    companyName: survey.companyName,
    principal: survey.principal,
    startDate: survey.startDate,
    industryName: industry.name,
    headcount: survey.headcount,
    questionSetId: survey.questionSetId,
    questionSetName: questionSet.name,
    link: survey.link,
  })
  .from(survey)
  .leftJoin(questionSet, eq(questionSet.id, survey.questionSetId))
  .leftJoin(industry, eq(industry.id, survey.industryId))
  .where(
    eq(survey.id, id)
  );
  if (result.length!==1) throw new NotFoundError("The id is not valid");
  return result[0];
}

/**
 * get the survey object from token
 * @param {*} token the survey token
 * @returns
 */
export async function GetSurveyByToken(token) {
  const curSurvey = await getDB().query.survey.findFirst({
    where: eq(survey.link, token),
  });
  if (curSurvey) return curSurvey;
  throw new NotFoundError("No existing survey");
}

/**
 * confirm the agreement for the survey
 * @param {*} curSurvey
 */
export async function ConfirmAgreement(curSurvey) {
  await getDB().transaction(async (tx) => {
    await tx
      .update(survey)
      .set({ status: SurveyStatus.CONFIRMED })
      .where(eq(survey.id, curSurvey.id));
  });
}

/**
 * Submit the survey
 * @param {*} curSurvey
 */
export async function Submit(curSurvey) {
  await getDB().transaction(async (tx) => {
    const responses = await tx
      .select({ count: count() })
      .from(response)
      .where(and(eq(response.surveyId, curSurvey.id), isNull(response.value)));
    if (responses[0].count > 0) {
      throw new ForbiddenError("The survey has not been finished yet");
    }
    await tx
      .update(survey)
      .set({ submissionDate: new Date(), status: SurveyStatus.SUBMITTED })
      .where(eq(survey.id, curSurvey.id));
  });
}

/**
 * insert a survey record and create all related response
 * @param {*} newSurvey
 */
export async function AddSurvey(newSurvey) {
  await getDB().transaction(async (tx) => {
    const result = await tx.insert(survey).values({
      name: newSurvey.name,
      principal: newSurvey.principal,
      industryId: newSurvey.industryId,
      companyName: newSurvey.companyName,
      headcount: newSurvey.headcount,
      startDate: new Date(newSurvey.startDate),
      questionSetId: newSurvey.questionSetId,
      link: encrypt(newSurvey.name + newSurvey.companyName),
      description: newSurvey.description,
    });
    const questionSetDetails = await tx.query.questionSetDetail.findMany({
      where: eq(questionSetDetail.questionSetId, newSurvey.questionSetId),
    });
    if (questionSetDetails.length === 0)
      throw new ForbiddenError(
        "the question set is empty / no question in the survey"
      );
    for (const item of questionSetDetails) {
      await tx.insert(response).values({
        questionId: item.questionId,
        surveyId: result[0].insertId,
      });
    }
  });
}

/**
 * Archive a survey by id
 * @param {*} id
 */
export async function ArchiveSurvey(id) {
  await getDB().transaction(async (tx) => {
    const curSurvey = await tx.query.survey.findFirst({
      where: eq(survey.id, id),
    });
    if (!curSurvey) throw new ForbiddenError("The survey does not exist");
    if (curSurvey.status === SurveyStatus.ARCHIVED) throw new ForbiddenError("The survey has already archived");
    await tx
      .update(survey)
      .set({ status: SurveyStatus.ARCHIVED, previousStatus: curSurvey.status })
      .where(eq(survey.id, id));
  });
}

/**
 * Unarchive a survey by id (restore it to previous status)
 * @param {*} id
 */
export async function UnarchiveSurvey(id) {
  await getDB().transaction(async (tx) => {
    const curSurvey = await tx.query.survey.findFirst({
      where: eq(survey.id, id),
    });
    if (!curSurvey) throw new ForbiddenError("The survey does not exist");
    if (curSurvey.status !== SurveyStatus.ARCHIVED) throw new ForbiddenError("The survey is not archived");
    await tx
      .update(survey)
      .set({ status: curSurvey.previousStatus })
      .where(eq(survey.id, id));
  });
}
