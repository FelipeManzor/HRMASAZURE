import { GetSurveyByToken } from "../service/survey.js";
import { GetResponseById } from "../service/progress.js";
import { Wrapper } from "./error-handler.js";
import SurveyStatus from "../const/survey-status.js";
import ForbiddenError from "../errors/forbidden.js";

/**
 * check if the token is valid
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export async function CheckToken(req, res, next) {
  Wrapper(req, res, next, async (req, res, next) => {
    const token = req.params.token;
    const curSurvey = await GetSurveyByToken(token);
    req.curSurvey = curSurvey;
    next();
  });
}

/**
 * check if the survey is new
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export function CheckIsNew(req, res, next) {
  Wrapper(req, res, next, async (req, res, next) => {
    const curSurvey = req.curSurvey;
    if (curSurvey.status !== SurveyStatus.NEW) {
      throw new ForbiddenError(
        "The survey is not eligible to confirm the agreement"
      );
    }
    next();
  });
}

/**
 * Check if the survey is in CONFIRMED state
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export function CheckIsConfirm(req, res, next) {
  Wrapper(req, res, next, async (req, res, next) => {
    const curSurvey = req.curSurvey;
    if (curSurvey.status !== SurveyStatus.CONFIRMED) {
      throw new ForbiddenError("You need to confirm the agreement");
    }
    next();
  });
}

/**
 * check if the response exists in db
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export function CheckResponse(req,res,next) {
  Wrapper(req,res,next, async (req,res,next)=>{
    const curSurvey = req.curSurvey;
    const responseId = req.params.response;
    req.curResponse = await GetResponseById(curSurvey, responseId)
    next();
  })
}