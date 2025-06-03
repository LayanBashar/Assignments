import { query } from "../config/db.js";

const submissionModel = {
  // إنشاء تسليم جديد (Student)
  async createSubmission({ quiz_id, user_id, answers, score }) {
    try {
      const { rows } = await query(
        `INSERT INTO quiz_submissions (quiz_id, user_id, answers, score)
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [quiz_id, user_id, answers, score]
      );
      if (!rows[0]) throw new Error("Submission failed");
      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  // جلب تسليم حسب المعرف (Student, Instructor/Admin)
  async getSubmissionById(id) {
    try {
      const { rows } = await query(
        `SELECT * FROM quiz_submissions WHERE id = $1`,
        [id]
      );
      if (!rows[0]) throw new Error("Submission not found");
      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  // جلب كل التسليمات لاختبار معين (Instructor/Admin)
  async getSubmissionsByQuizId(quiz_id) {
    try {
      const { rows } = await query(
        `SELECT * FROM quiz_submissions WHERE quiz_id = $1 ORDER BY submitted_at DESC`,
        [quiz_id]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  },

  // جلب كل التسليمات لطالب معين (Student)
  async getSubmissionsByUserId(user_id) {
    try {
      const { rows } = await query(
        `SELECT * FROM quiz_submissions WHERE user_id = $1 ORDER BY submitted_at DESC`,
        [user_id]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  },

  // تحديث درجة التسليم (Instructor/Admin)
  async updateSubmission(id, { score }) {
    try {
      const { rows } = await query(
        `UPDATE quiz_submissions
         SET score = $1, updated_at = CURRENT_TIMESTAMP
         WHERE id = $2 RETURNING *`,
        [score, id]
      );
      if (!rows[0]) throw new Error("Submission not found");
      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  // حذف تسليم (Admin)
  async deleteSubmission(id) {
    try {
      const { rows } = await query(
        `DELETE FROM quiz_submissions WHERE id = $1 RETURNING *`,
        [id]
      );
      if (!rows[0]) throw new Error("Submission not found");
      return rows[0];
    } catch (error) {
      throw error;
    }
  },
};

export default submissionModel;
