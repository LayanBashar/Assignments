import QuestionModel from "../models/questionModel.js";

const QuestionController = {
  async addQuestion(req, res, next) {
    try {
      const {
        quiz_id,
        question,
        correct_answer,
        option_a,
        option_b,
        option_c,
        option_d,
      } = req.body;
      const newQuestion = await QuestionModel.create({
        quiz_id,
        question,
        correct_answer,
        option_a,
        option_b,
        option_c,
        option_d,
      });
      res.status(201).json(newQuestion);
    } catch (err) {
      next(err);
    }
  },

  async getQuizQuestions(req, res, next) {
    try {
      const { quiz_id } = req.params;
      const questions = await QuestionModel.findByQuizId(quiz_id);
      res.json(questions);
    } catch (err) {
      next(err);
    }
  },
};

export default QuestionController;
