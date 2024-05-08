// All apis for client side
import express from "express";
import {
  CheckToken,
  CheckIsNew,
  CheckIsConfirm,
  CheckResponse,
} from "../middleware/validate.js";
import { ConfirmAgreement, Submit } from "../service/survey.js";
import { GetSurveyMenuState } from "../service/category.js";
import {
  LoadProgress,
  SaveAttachment,
  SaveProgressByCategory,
} from "../service/progress.js";
import { Wrapper } from "../middleware/error-handler.js";
import { SingleUpload } from "../middleware/upload.js";

const client = express.Router();

/**
 * Get the survey status from api
 */
client.get("/:token/status", CheckToken, (req, res, next) => {
  Wrapper(req, res, next, (req, res) => {
    res.json(req.curSurvey.status);
  });
});

/**
 * agree the survey agreement
 */
client.put("/:token/agree", CheckToken, CheckIsNew, async (req, res, next) => {
  Wrapper(req, res, next, async (req, res) => {
    const curSurvey = req.curSurvey;
    await ConfirmAgreement(curSurvey);
    res.json("success");
  });
});

/**
 * submit the survey
 */
client.put(
  "/:token/submit",
  CheckToken,
  CheckIsConfirm,
  async (req, res, next) => {
    Wrapper(req, res, next, async (req, res) => {
      const curSurvey = req.curSurvey;
      await Submit(curSurvey);
      res.json("success");
    });
  }
);

/**
 * get the menu of current survey
 */
client.get(
  "/:token/menu",
  CheckToken,
  CheckIsConfirm,
  async (req, res, next) => {
    Wrapper(req, res, next, async (req, res) => {
      const curSurvey = req.curSurvey;
      res.json(await GetSurveyMenuState(curSurvey));
    });
  }
);

/**
 * get question by category and survey
 */
client.get(
  "/:token/progress/:category",
  CheckToken,
  CheckIsConfirm,
  async (req, res, next) => {
    Wrapper(req, res, next, async (req, res) => {
      const curSurvey = req.curSurvey;
      const categoryId = req.params.category;
      res.json(await LoadProgress(curSurvey.id, categoryId));
    });
  }
);

/**
 * sync progress
 */
client.put(
  "/:token/progress/:category",
  CheckToken,
  CheckIsConfirm,
  async (req, res, next) => {
    Wrapper(req, res, next, async (req, res) => {
      const responses = req.body;
      await SaveProgressByCategory(responses);
      res.json("success");
    });
  }
);

client.post(
  "/:token/upload/:response",
  CheckToken,
  CheckIsConfirm,
  CheckResponse,
  SingleUpload,
  async (req, res, next) => {
    Wrapper(req, res, next, async (req, res) => {
      const curSurvey = req.curSurvey;
      const curResponse = req.curResponse;
      const file = req.file;
      res.json(await SaveAttachment(curSurvey, curResponse, file));
    });
  }
);

export default client;
