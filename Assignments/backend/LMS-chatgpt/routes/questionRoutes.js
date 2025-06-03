import express from "express";
import QuestionController from "../controllers/questionController.js";

const router = express.Router();

router.post("/", QuestionController.addQuestion);
router.get("/:quiz_id", QuestionController.getQuizQuestions);

export default router;
