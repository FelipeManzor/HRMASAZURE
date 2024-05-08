import client from "./client.js";
import admin from "./admin.js";
import express from "express";
import cors from "cors";
import { ErrorHandler } from "../middleware/error-handler.js";

const corsOptions = {
  origin: process.env.CORS ? process.env.CORS.split(",") : true,
  optionsSuccessStatus: 200,
};

export default function initRouter(app) {
  app.use(cors(corsOptions));

  // static files (upload)
  app.use("/files", express.static("files"));
  // support json parser
  app.use(express.json());

  // router for client side
  app.use("/survey", client);
  app.use("/admin", admin);

  // general error handling
  app.use(ErrorHandler);
}
