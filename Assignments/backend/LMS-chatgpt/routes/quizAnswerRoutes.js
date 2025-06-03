import express from "express";
import QuizAnswerController from "../controllers/quizAnswerController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, QuizAnswerController.submitAnswer);
router.get(
  "/:quiz_id",
  authMiddleware,
  QuizAnswerController.getAnswersByUserAndQuiz
);

export default router;
