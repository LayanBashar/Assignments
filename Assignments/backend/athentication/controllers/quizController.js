import { quizSchema } from "../utils/validation.js";
import quizModel from "../models/quizModel.js";

const quizController = {
  async createQuiz(req, res, next) {
    try {
      const { error, value } = quizSchema.validate(req.body);
      if (error)
        return res.status(400).json({ message: error.details[0].message });

      const quiz = await quizModel.createQuiz(value);
      res.status(201).json({ quiz });
    } catch (error) {
      next(error);
    }
  },

  async getQuizById(req, res, next) {
    try {
      const { id } = req.params;
      const quiz = await quizModel.getQuizById(id);
      if (!quiz) return res.status(404).json({ message: "Quiz not found" });
      res.json({ quiz });
    } catch (error) {
      next(error);
    }
  },

  async getQuizzesByLessonId(req, res, next) {
    try {
      const { lesson_id } = req.params;
      const quizzes = await quizModel.getQuizzesByLessonId(lesson_id);
      res.json({ quizzes });
    } catch (error) {
      next(error);
    }
  },
  async updateQuiz(req, res, next) {
    try {
      const { id } = req.params;
      const { error, value } = quizSchema.validate(req.body);
      if (error)
        return res.status(400).json({ message: error.details[0].message });

      const updated = await quizModel.updateQuiz(id, value);
      if (!updated) return res.status(404).json({ message: "Quiz not found" });
      res.json({ quiz: updated });
    } catch (error) {
      next(error);
    }
  },

  async deleteQuiz(req, res, next) {
    try {
      const { id } = req.params;
      await quizModel.deleteQuiz(id);
      res.json({ message: "Quiz deleted successfully" });
    } catch (error) {
      if (error.message === "Quiz not found") {
        return res.status(404).json({ message: error.message });
      }
      next(error);
    }
  },
};
export default quizController;
