import { query } from "../config/db.js";

const CourseModel = {
  async getAll() {
    const { rows } = await query(`SELECT * FROM courses`);
    return rows;
  },

  async getById(id) {
    const { rows } = await query(`SELECT * FROM courses WHERE id = $1`, [id]);
    return rows[0];
  },

  async create({ title, description, instructor_id }) {
    const { rows } = await query(
      `INSERT INTO courses (title, description, instructor_id)
       VALUES ($1, $2, $3) RETURNING *`,
      [title, description, instructor_id]
    );
    return rows[0];
  },

  async update(id, { title, description }) {
    const { rows } = await query(
      `UPDATE courses SET title = $1, description = $2 WHERE id = $3 RETURNING *`,
      [title, description, id]
    );
    return rows[0];
  },

  async delete(id) {
    await query(`DELETE FROM courses WHERE id = $1`, [id]);
  },
};

export default CourseModel;
