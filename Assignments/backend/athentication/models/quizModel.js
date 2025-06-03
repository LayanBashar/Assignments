import { query } from "../config/db.js";

const quizModel = {
  async createQuiz({
    lesson_id,
    question,
    options,
    correct_answer,
    max_score,
  }) {
    try {
      const { rows } = await query(
        `INSERT INTO quizzes (lesson_id, question, options, correct_answer, max_score)
            VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [lesson_id, question, options, correct_answer, max_score]
      );
      if (!rows[0]) throw new Error("Quiz creation failed");
      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  async updateQuiz(id, { question, options, correct_answer, max_score }) {
    try {
      const { rows } = await query(
        `UPDATE quizzes SET
           question = $1,
           options = $2,
           correct_answer = $3,
           max_score = $4,
           updated_at = CURRENT_TIMESTAMP
         WHERE id = $5 RETURNING *`,
        [question, options, correct_answer, max_score, id]
      );
      if (!rows[0]) throw new Error("Quiz not found");
      return rows[0];
    } catch (error) {
      throw error;
    }
  },
  async deleteQuiz(id) {
    try {
      const { rows } = await query(
        `DELETE FROM quizzes WHERE id = $1 RETURNING *`,
        [id]
      );
      if (!rows[0]) throw new Error("Quiz not found");
      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  async getQuizById(id) {
    try {
      const { rows } = await query(`SELECT * FROM quizzes WHERE id = $1`, [id]);
      if (!rows[0]) throw new Error("Quiz not found");
      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  async getQuizzesByLessonId(lesson_id) {
    try {
      const { rows } = await query(
        `SELECT * FROM quizzes WHERE lesson_id = $1`,
        [lesson_id]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  },
};
