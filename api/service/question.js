import { eq } from "drizzle-orm";
import { getDB } from "../db/db.js";
import { category, question } from "../db/schema.js";
import ParamError from "../errors/param.js";
import csv from "csv-parser";
import fs from "fs";
import { Readable } from "stream";

export async function GetAllQuestion() {
  return await getDB()
    .select({
      id: question.id,
      title: question.title,
      body: question.body,
      categoryId: question.categoryId,
      categoryName: category.name,
      bestPractice: question.bestPractice,
    })
    .from(question)
    .leftJoin(category, eq(question.categoryId, category.id));
}

export async function UpdateQuestion(newQuestion) {
  await getDB().transaction(async (tx) => {
    await tx
      .update(question)
      .set({
        title: newQuestion.title,
        body: newQuestion.body,
        categoryId: newQuestion.categoryId,
        bestPractice: newQuestion.bestPractice,
      })
      .where(eq(question.id, newQuestion.id));
  });
}

export async function AddQuestion(newQuestion) {
  await getDB().transaction(async (tx) => {
    await tx.insert(question).values({
      title: newQuestion.title,
      body: newQuestion.body,
      categoryId: newQuestion.categoryId,
      bestPractice: newQuestion.bestPractice,
    });
  });
}

export async function ImportQuestion(file) {
  if (!file) throw new ParamError("No CSV file uploaded");
  const fileStream = Readable.from(file.buffer);
  const csvData = [];
  fileStream
    .pipe(csv())
    .on("data", (data) => csvData.push(data))
    .on("end", async () => {
      await getDB().transaction(async (tx) => {
        for (const q of csvData) {
          await tx.insert(question).values({
            title: q.title,
            body: q.body,
            categoryId: q.categoryId,
            bestPractice: q.bestPractice,
          });
        }
      });
    });
}
