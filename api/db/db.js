import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema.js";

const poolConnection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

let db = null;

function initDb() {
  try {
    db = drizzle(poolConnection, {schema, mode: "default"});
  } catch (e) {
    console.error(`Error initializing database: ${e}`);
  }
}

function getDB() {
  return db
}

export { initDb, getDB };
