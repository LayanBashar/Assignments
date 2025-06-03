import { query } from "../config/db.js";

const QuestionModel = {
  async create({
    quiz_id,
    question,
    correct_answer,
    option_a,
    option_b,
    option_c,
    option_d,
  }) {
    const { rows } = await query(
      `INSERT INTO quiz_questions 
       (quiz_id, question, correct_answer, option_a, option_b, option_c, option_d)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        quiz_id,
        question,
        correct_answer,
        option_a,
        option_b,
        option_c,
        option_d,
      ]
    );
    return rows[0];
  },

  async findByQuizId(quiz_id) {
    const { rows } = await query(
      "SELECT * FROM quiz_questions WHERE quiz_id = $1",
      [quiz_id]
    );
    return rows;
  },
};

export default QuestionModel;
