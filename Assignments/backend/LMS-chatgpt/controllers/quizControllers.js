import QuizModel from "../models/quizModel.js";
import pool from "../db.js"; // تأكدي أنه هذا موجود وموصول

const QuizController = {
  async createQuiz(req, res, next) {
    try {
      const { course_id, title, description, total_marks } = req.body;
      const newQuiz = await QuizModel.create({
        course_id,
        title,
        description,
        total_marks,
      });
      res.status(201).json(newQuiz);
    } catch (err) {
      next(err);
    }
  },

  async getAllQuizzes(req, res, next) {
    try {
      const quizzes = await QuizModel.findAll();
      res.json(quizzes);
    } catch (err) {
      next(err);
    }
  },

  async getQuizById(req, res, next) {
    try {
      const { id } = req.params;
      const quiz = await QuizModel.findById(id);
      if (!quiz) return res.status(404).json({ message: "Quiz not found" });
      res.json(quiz);
    } catch (err) {
      next(err);
    }
  },

  async deleteQuiz(req, res, next) {
    try {
      const { id } = req.params;
      await QuizModel.delete(id);
      res.json({ message: "Quiz deleted" });
    } catch (err) {
      next(err);
    }
  },

  // ✅ الدالة الجديدة لحساب نتيجة الكويز
  async submitQuiz(req, res, next) {
    const { quiz_id, answers } = req.body;
    const user_id = req.user.id; // تأكدي أن فيه auth middleware بيحط req.user

    try {
      let correctCount = 0;

      for (const answer of answers) {
        const { question_id, selected_option } = answer;

        const questionResult = await pool.query(
          "SELECT correct_option FROM questions WHERE id = $1",
          [question_id]
        );

        const correctOption = questionResult.rows[0].correct_option;

        if (selected_option === correctOption) {
          correctCount++;
        }

        await pool.query(
          "INSERT INTO student_answers (user_id, question_id, selected_option) VALUES ($1, $2, $3)",
          [user_id, question_id, selected_option]
        );
      }

      const totalQuestions = answers.length;
      const score = `${correctCount} / ${totalQuestions}`;

      res.json({
        success: true,
        score,
        correctCount,
        totalQuestions,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default QuizController;
