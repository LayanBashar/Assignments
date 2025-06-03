import QuizAnswerModel from "../models/quizAnswerModel.js";
import QuestionModel from "../models/questionModel.js";

const QuizAnswerController = {
  async submitAnswer(req, res, next) {
    try {
      const { quiz_id, question_id, selected_answer } = req.body;
      const user_id = req.user.id; // تأكد إنك مستخدم middleware للتوثيق

      const questions = await QuestionModel.findByQuizId(quiz_id);
      const question = questions.find((q) => q.id === parseInt(question_id));

      if (!question) throw new Error("Question not found");

      const is_correct = question.correct_answer === selected_answer;

      const savedAnswer = await QuizAnswerModel.create({
        user_id,
        quiz_id,
        question_id,
        selected_answer,
        is_correct,
      });

      res.status(201).json({
        success: true,
        answer: savedAnswer,
      });
    } catch (err) {
      next(err);
    }
  },

  async getAnswersByUserAndQuiz(req, res, next) {
    try {
      const user_id = req.user.id;
      const { quiz_id } = req.params;

      const answers = await QuizAnswerModel.getByUserAndQuiz(user_id, quiz_id);
      res.json({ success: true, answers });
    } catch (err) {
      next(err);
    }
  },
};

export default QuizAnswerController;
