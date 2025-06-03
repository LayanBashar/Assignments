import { Router } from "express";
import QuizSubmissionController from "../controllers/quizSubmissionController.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

// راوت لحفظ إجابات الطالب وتسجيل النتيجة
router.post("/submit", authenticate, QuizSubmissionController.submitQuiz);

export default router;
