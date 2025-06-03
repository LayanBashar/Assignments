import { query } from "../config/db.js";

const QuizModel = {
  async create({ course_id, title, description, total_marks }) {
    const { rows } = await query(
      `INSERT INTO quizzes (course_id, title, description, total_marks)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [course_id, title, description, total_marks]
    );
    return rows[0];
  },

  async findAll() {
    const { rows } = await query("SELECT * FROM quizzes");
    return rows;
  },

  async findById(id) {
    const { rows } = await query("SELECT * FROM quizzes WHERE id = $1", [id]);
    return rows[0];
  },

  async delete(id) {
    await query("DELETE FROM quizzes WHERE id = $1", [id]);
  },
};

export default QuizModel;
