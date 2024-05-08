import { and, count, eq } from "drizzle-orm";
import { getDB } from "../db/db.js";
import { category, question, response } from "../db/schema.js";
import ForbiddenError from "../errors/forbidden.js";

export async function GetSurveyMenuState(curSurvey) {
  return await getDB()
    .select({
      id: category.id,
      title: category.name,
      isDone: eq(count(response.value), count(response.id)),
    })
    .from(response)
    .leftJoin(question, eq(question.id, response.questionId))
    .leftJoin(category, eq(category.id, question.categoryId))
    .where(eq(response.surveyId, curSurvey.id))
    .groupBy(category.id);
}

export async function GetAllCategory() {
  return await getDB().query.category.findMany();
}

export async function UpdateCategory(newCategory) {
  console.log(newCategory)
  await getDB().transaction(async (tx) => {
    await tx
      .update(category)
      .set({
        name: newCategory.name,
      })
      .where(eq(category.id, newCategory.id));
  });
}

export async function DeleteCategory(id) {
  await getDB().transaction(async (tx) => {
    const result = await tx
      .select({ count: count() })
      .from(question)
      .where(eq(question.categoryId, id));
    if (result[0].count > 0) {
      throw new ForbiddenError(
        "The category has associated questions, you cannot delete it"
      );
    }
    await tx.delete(category).where(eq(category.id, id));
  });
}

export async function AddCategory(newCategory) {
  return await getDB().transaction(async (tx) => {
    const affects = await tx.insert(category).values({
      name: newCategory.name,
    });
    return affects[0].insertId;
  });
}
