import {
  int,
  mysqlTable,
  date,
  varchar,
  serial,
  text,
  primaryKey,
} from "drizzle-orm/mysql-core";

export const category = mysqlTable("category", {
  id: serial("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
});

export const question = mysqlTable("question", {
  id: serial("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 255 }).notNull(),
  body: text("body").notNull(),
  categoryId: int("category_id").references(() => category.id),
  bestPractice: text("best_practice_statement"),
});

export const questionSet = mysqlTable("questionset", {
  id: serial("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
});

export const questionSetDetail = mysqlTable(
  "questionsetdetail",
  {
    questionId: int("question_id").references(() => question.id),
    questionSetId: int("question_set_id").references(() => questionSet.id),
    weight: int("weight"),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.questionId, table.questionSetId] }),
    };
  }
);

export const industry = mysqlTable("industry", {
  id: serial("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
});

export const survey = mysqlTable("survey", {
  id: serial("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  principal: varchar("principal", { length: 255 }).notNull(),
  industryId: int("industry_id").references(() => industry.id),
  companyName: varchar("company_name", { length: 255 }).notNull(),
  headcount: int("headcount"),
  startDate: date("start_date"),
  submissionDate: date("submission_date"),
  status: int("status").default(0).notNull(), 
  previousStatus: int("previous_status"),
  questionSetId: int("question_set_id").references(() => questionSet.id),
  link: varchar("link", { length: 255 }).notNull(),
  description: text("description"),
});

export const response = mysqlTable("response", {
  id: serial("id").primaryKey().autoincrement(),
  value: int("value"),
  adjustment: int("adjustment"),
  questionId: int("question_id").references(() => question.id),
  surveyId: int("survey_id").references(() => survey.id),
});

export const attachment = mysqlTable("attachment", {
  id: serial("id").primaryKey().autoincrement(),
  responseId: int("response_id").references(() => response.id),
  name: varchar("name", { length: 255 }).notNull(),
  path: varchar("path", { length: 255 }).notNull(),
  size: int("size"),
});
