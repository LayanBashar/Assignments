import { query } from "../config/db.js";

const QuizAnswerModel = {
  async create({ user_id, quiz_id, question_id, selected_answer, is_correct }) {
    const { rows } = await query(
      `INSERT INTO quiz_answers 
       (user_id, quiz_id, question_id, selected_answer, is_correct)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [user_id, quiz_id, question_id, selected_answer, is_correct]
    );
    return rows[0];
  },

  async getByUserAndQuiz(user_id, quiz_id) {
    const { rows } = await query(
      `SELECT * FROM quiz_answers WHERE user_id = $1 AND quiz_id = $2`,
      [user_id, quiz_id]
    );
    return rows;
  },
};

export default QuizAnswerModel;
