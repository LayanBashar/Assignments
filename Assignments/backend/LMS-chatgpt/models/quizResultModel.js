import pool from "../db.js";

const QuizResultsModel = {
  async create({ user_id, quiz_id, score }) {
    const result = await pool.query(
      `INSERT INTO quiz_results (user_id, quiz_id, score)
       VALUES ($1, $2, $3) RETURNING *`,
      [user_id, quiz_id, score]
    );
    return result.rows[0];
  },

  async findByUserAndQuiz(user_id, quiz_id) {
    const result = await pool.query(
      `SELECT * FROM quiz_results WHERE user_id = $1 AND quiz_id = $2`,
      [user_id, quiz_id]
    );
    return result.rows[0];
  },

  async getResultsForUser(user_id) {
    const result = await pool.query(
      `SELECT * FROM quiz_results WHERE user_id = $1`,
      [user_id]
    );
    return result.rows;
  },
};

export default QuizResultsModel;
