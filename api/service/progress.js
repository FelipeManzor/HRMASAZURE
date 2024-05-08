import { and, eq, inArray } from "drizzle-orm";
import { getDB } from "../db/db.js";
import { question, response, attachment } from "../db/schema.js";
import NotFoundError from "../errors/notfound.js";
import ParamError from "../errors/param.js";
import save from "../util/upload.js";

/**
 * Get response by id
 * @param {*} curSurvey
 * @param {*} responseId
 * @returns
 */
export async function GetResponseById(curSurvey, responseId) {
  const curResponse = await getDB().query.response.findFirst({
    where: and(
      eq(response.id, responseId),
      eq(response.surveyId, curSurvey.id)
    ),
  });
  if (curResponse) return curResponse;
  throw new NotFoundError("No existing response for attachment");
}

/**
 * Load progress (question & response)
 * @param {*} surveyId
 * @param {*} categoryId
 * @returns
 */
export async function LoadProgress(surveyId, categoryId) {
  const progress = await getDB()
    .select({
      id: response.id,
      title: question.title,
      body: question.body,
      value: response.value,
      adjustment: response.adjustment,
      categoryId: question.categoryId,
    })
    .from(question)
    .leftJoin(response, eq(question.id, response.questionId))
    .where(
      and(
        eq(response.surveyId, surveyId),
        categoryId ? eq(question.categoryId, categoryId) : true
      )
    );
  if (progress.length === 0)
    throw new NotFoundError("No corresponding category in the survey");
  for (const item of progress) {
    item.attachments = await getDB()
      .select()
      .from(attachment)
      .where(eq(attachment.responseId, item.id));
  }
  return progress;
}

/**
 * Save the progress
 * @param {*} responses
 */
export async function SaveProgressByCategory(responses) {
  if (!Array.isArray(responses)) throw new ParamError("Invalid request body");
  if (responses.length === 0) throw new ParamError("Empty responses");
  await getDB().transaction(async (tx) => {
    for (const resp of responses) {
      if (resp.value !== null) {
        await tx
          .update(response)
          .set({ value: resp.value })
          .where(eq(response.id, resp.id));
      }
      await tx
        .update(attachment)
        .set({ responseId: null })
        .where(eq(attachment.responseId, resp.id));
      if (!Array.isArray(resp.attachments))
        throw new ParamError("Wrong responses structure");
      if (resp.attachments.length > 0) {
        const attachmentIds = resp.attachments.map((x) => x.id);
        await tx
          .update(attachment)
          .set({ responseId: resp.id })
          .where(inArray(attachment.id, attachmentIds));
      }
    }
  });
}

/**
 * save the file and add attachment record
 * @param {*} curSurvey
 * @param {*} curResponse
 * @param {*} file
 * @returns
 */
export async function SaveAttachment(curSurvey, curResponse, file) {
  if (!file) throw new ParamError("No attachment uploaded");
  return await getDB().transaction(async (tx) => {
    const path = await save(
      file,
      curSurvey.id.toString(),
      curResponse.questionId.toString()
    );
    const affects = await tx.insert(attachment).values({
      name: file.originalname,
      path: path,
      size: Math.ceil(file.size / 1024),
    });
    return affects[0].insertId;
  });
}

export async function AdjustResponse(responses) {
  if (!Array.isArray(responses)) throw new ParamError("Invalid request body");
  await getDB().transaction(async (tx) => {
    for (const resp of responses) {
      await tx.update(response)
        .set({ adjustment: resp.adjustment })
        .where(eq(response.id, resp.id));
    }
  });
}

