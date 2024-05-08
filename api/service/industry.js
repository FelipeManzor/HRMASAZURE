import { getDB } from "../db/db.js";
import { industry, survey } from "../db/schema.js";
import ForbiddenError from "../errors/forbidden.js";
import { eq, count } from "drizzle-orm";

export async function GetIndustryList() {
  return await getDB().select().from(industry);
}

export async function UpdateIndustry(newIndustry) {
  await getDB().transaction(async (tx) => {
    await tx
      .update(industry)
      .set({
        name: newIndustry.name,
        description: newIndustry.description,
      })
      .where(eq(industry.id, newIndustry.id));
  });
}

export async function DeleteIndustry(id) {
  await getDB().transaction(async (tx) => {
    const relatedSurvey = await tx
      .select({ count: count() })
      .from(survey)
      .where(eq(survey.industryId, id));
    if (relatedSurvey[0].count > 0)
      throw new ForbiddenError(
        "It's not allowed to delete industry with associated surveys."
      );
    await getDB().delete(industry).where(eq(industry.id, id));
  });
}

export async function AddIndustry(newIndustry) {
  return await getDB().transaction(async (tx) => {
    const affects = await tx.insert(industry).values({
      name: newIndustry.name,
      description: newIndustry.description,
    });
    return affects[0].insertId;
  });
}
