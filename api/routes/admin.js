import express from "express";
import {
  DeleteIndustry,
  GetIndustryList,
  UpdateIndustry,
  AddIndustry,
} from "../service/industry.js";
import { Wrapper } from "../middleware/error-handler.js";
import {
  AddSurvey,
  ArchiveSurvey,
  GetSurveyDetailById,
  GetSurveyList,
  UnarchiveSurvey,
} from "../service/survey.js";
import { AdjustResponse, LoadProgress } from "../service/progress.js";
import {
  AddQuestion,
  GetAllQuestion,
  ImportQuestion,
  UpdateQuestion,
} from "../service/question.js";
import {
  AddCategory,
  DeleteCategory,
  GetAllCategory,
  UpdateCategory,
} from "../service/category.js";
import {
  AddQuestionSet,
  GetAllQuestionSet,
  GetQuestionSetDetail,
} from "../service/questionset.js";
import { SingleUpload } from "../middleware/upload.js";

const admin = express.Router();

// get all industry
admin.get("/industry", async (req, res, next) => {
  Wrapper(req, res, next, async (req, res) => {
    res.json(await GetIndustryList());
  });
});

// update industry
admin.put("/industry", async (req, res, next) => {
  Wrapper(req, res, next, async (req, res) => {
    const newIndustry = req.body;
    await UpdateIndustry(newIndustry);
    res.json("success");
  });
});

// delete industry
admin.delete("/industry/:id", async (req, res, next) => {
  Wrapper(req, res, next, async (req, res) => {
    const id = req.params.id;
    await DeleteIndustry(id);
    res.json("success");
  });
});

// add new industry
admin.post("/industry", async (req, res, next) => {
  Wrapper(req, res, next, async (req, res) => {
    const newIndustry = req.body;
    res.json(await AddIndustry(newIndustry));
  });
});

// get in-progress case
admin.get("/progress-case", async (req, res, next) => {
  Wrapper(req, res, next, async (req, res) => {
    res.json(await GetSurveyList(false));
  });
});

// get archived case
admin.get("/archived-case", async (req, res, next) => {
  Wrapper(req, res, next, async (req, res) => {
    res.json(await GetSurveyList(true));
  });
});

admin.post("/case", async (req, res, next) => {
  Wrapper(req, res, next, async (req, res) => {
    const newSurvey = req.body;
    await AddSurvey(newSurvey);
    res.json("success");
  });
});

admin.put("/archive/case/:id", async (req, res, next) => {
  Wrapper(req, res, next, async (req, res) => {
    const id = req.params.id;
    await ArchiveSurvey(id);
    res.json("success");
  });
});

admin.put("/unarchive/case/:id", async (req, res, next) => {
  Wrapper(req, res, next, async (req, res) => {
    const id = req.params.id;
    await UnarchiveSurvey(id);
    res.json("success");
  });
});

admin.get("/case/:id", async (req, res,next) => {
  Wrapper(req, res, next, async (req, res) => {
    const id = req.params.id;
    res.json(await GetSurveyDetailById(id));
  });
});

admin.get("/case/progress/:id", async (req, res, next) => {
  Wrapper(req, res, next, async (req, res) => {
    const id = req.params.id;
    res.json(await LoadProgress(id));
  });
});

admin.put("/adjust/case", async (req, res, next) => {
  Wrapper(req, res, next, async (req, res) => {
    const responses = req.body;
    await AdjustResponse(responses);
    res.json("success");
  });
});

admin.get("/question", async (req, res, next) => {
  Wrapper(req, res, next, async (req, res) => {
    res.json(await GetAllQuestion());
  });
});

admin.put("/question", async (req, res, next) => {
  Wrapper(req, res, next, async (req, res) => {
    const newQuestion = req.body;
    await UpdateQuestion(newQuestion);
    res.json("success");
  });
});

admin.post("/question", async (req, res, next) => {
  Wrapper(req, res, next, async (req, res) => {
    const newQuestion = req.body;
    await AddQuestion(newQuestion);
    res.json("success");
  });
});

admin.get("/category", async (req, res, next) => {
  Wrapper(req, res, next, async (req, res) => {
    res.json(await GetAllCategory());
  });
});

admin.post("/category", async (req, res, next) => {
  Wrapper(req, res, next, async (req, res) => {
    const newCategory = req.body;
    res.json(await AddCategory(newCategory));
  });
});

admin.delete("/category/:id", async (req, res, next) => {
  Wrapper(req, res, next, async (req, res) => {
    const id = req.params.id;
    await DeleteCategory(id);
    res.json("success");
  });
});

admin.put("/category", async (req, res, next) => {
  Wrapper(req, res, next, async (req, res) => {
    const newCategory = req.body;
    await UpdateCategory(newCategory);
    res.json("success");
  });
});

admin.get("/questionset", async (req, res, next) => {
  Wrapper(req, res, next, async (req, res) => {
    res.json(await GetAllQuestionSet());
  });
});

admin.get("/questionset/:id", async (req, res, next) => {
  Wrapper(req, res, next, async (req, res) => {
    const id = req.params.id;
    res.json(await GetQuestionSetDetail(id));
  });
});

admin.post("/questionset", async (req, res, next) => {
  Wrapper(req, res, next, async (req, res) => {
    const newQuestionSet = req.body;
    await AddQuestionSet(newQuestionSet);
    res.json("success");
  });
});

admin.post("/import/question", SingleUpload, async (req, res, next) => {
  Wrapper(req, res, next, async (req, res) => {
    const file = req.file;
    await ImportQuestion(file);
    res.json("success");
  });
});

export default admin;
