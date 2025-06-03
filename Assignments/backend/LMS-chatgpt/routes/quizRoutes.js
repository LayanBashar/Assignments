import express from "express";
import QuizController from "../controllers/quizController.js";
import authMiddleware from "../middlewares/auth.js"; // لو عندك middleware

const router = express.Router();

router.get("/", QuizController.getAllQuizzes);
router.get("/:id", QuizController.getQuizById);
router.post("/", QuizController.createQuiz);
router.delete("/:id", QuizController.deleteQuiz);
router.post("/submit", authMiddleware, QuizController.submitQuiz);

export default router;
