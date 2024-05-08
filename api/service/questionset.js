import { eq } from "drizzle-orm";
import { getDB } from "../db/db.js";
import { question, questionSet, questionSetDetail } from "../db/schema.js";
import ForbiddenError from "../errors/forbidden.js";
import ParamError from "../errors/param.js";

export async function GetAllQuestionSet() {
  return await getDB().query.questionSet.findMany();
}

export async function GetQuestionSetDetail(id) {
  return await getDB()
    .select({
      title: question.title,
      body: question.body,
    })
    .from(questionSetDetail)
    .leftJoin(question, eq(question.id, questionSetDetail.questionId))
    .where(eq(questionSetDetail.questionSetId, id));
}

export async function AddQuestionSet(newQuestionSet) {
  await getDB().transaction(async (tx) => {
    const result = await tx
      .insert(questionSet)
      .values({ name: newQuestionSet.name });
    const questionSetId = result[0].insertId;
    if (!Array.isArray(newQuestionSet.detail))
      throw new ParamError("Wrong structure of question detail");
    if (newQuestionSet.detail.length === 0)
      throw new ForbiddenError("Empty question set detail");
    for (const id of newQuestionSet.detail) {
      await tx.insert(questionSetDetail).values({
        questionId: id,
        questionSetId: questionSetId,
        weight: 1,
      });
    }
  });
}
