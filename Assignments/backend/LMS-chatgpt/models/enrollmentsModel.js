import { query } from "../config/db.js";

const EnrollmentModel = {
  async enroll(userId, courseId) {
    const { rows } = await query(
      `INSERT INTO enrollments (user_id, course_id) VALUES ($1, $2) RETURNING *`,
      [userId, courseId]
    );
    return rows[0];
  },

  async getAll() {
    const { rows } = await query(`
      SELECT e.*, u.name AS student_name, c.title AS course_title
      FROM enrollments e
      JOIN users u ON e.user_id = u.id
      JOIN courses c ON e.course_id = c.id
    `);
    return rows;
  },

  async getByUser(userId) {
    const { rows } = await query(
      `
      SELECT e.*, c.title AS course_title
      FROM enrollments e
      JOIN courses c ON e.course_id = c.id
      WHERE e.user_id = $1
    `,
      [userId]
    );
    return rows;
  },

  async deleteEnrollment(id) {
    const { rows } = await query(
      `DELETE FROM enrollments WHERE id = $1 RETURNING *`,
      [id]
    );
    return rows[0];
  },
};

export default EnrollmentModel;
