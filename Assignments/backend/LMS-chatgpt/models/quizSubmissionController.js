import QuizResultsModel from "../models/quizResultsModel.js";
import QuizAnswersModel from "../models/quizAnswersModel.js"; // لازم تعمل هذا الموديل
import QuestionModel from "../models/questionModel.js";

const QuizSubmissionController = {
  async submitQuiz(req, res, next) {
    try {
      const { quiz_id, answers } = req.body; // answers = [{ question_id, answer }]
      const user_id = req.user.id;

      // 1. Get all questions for this quiz
      const questions = await QuestionModel.findByQuizId(quiz_id);

      // 2. Calculate score
      let score = 0;
      questions.forEach((q) => {
        const submitted = answers.find((a) => a.question_id === q.id);
        if (submitted && submitted.answer === q.correct_answer) {
          score++;
        }
      });

      // 3. Save all answers
      for (const answer of answers) {
        await QuizAnswersModel.create({
          user_id,
          quiz_id,
          question_id: answer.question_id,
          selected_answer: answer.answer,
        });
      }

      // 4. Save result in quiz_results
      const result = await QuizResultsModel.create({
        user_id,
        quiz_id,
        score,
      });

      res.json({
        success: true,
        message: "Quiz submitted",
        score,
        result,
      });
    } catch (err) {
      next(err);
    }
  },
};

export default QuizSubmissionController;
