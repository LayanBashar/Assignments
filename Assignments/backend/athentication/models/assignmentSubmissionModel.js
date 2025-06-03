import { query } from "../config/db.js";

const assignmentSubmissionModel = {
  // ✅ إنشاء تسليم جديد - نتحقق يدويًا من التكرار
  async createSubmission({ assignment_id, user_id, submission_url }) {
    try {
      // تحقق إذا المستخدم سلّم من قبل هذا الواجب
      const existing = await query(
        `SELECT * FROM submissions WHERE assignment_id = $1 AND user_id = $2`,
        [assignment_id, user_id]
      );

      if (existing.rows.length > 0) {
        throw new Error("You have already submitted this assignment.");
      }

      const { rows } = await query(
        `INSERT INTO submissions (assignment_id, user_id, submission_url)
         VALUES ($1, $2, $3) RETURNING *`,
        [assignment_id, user_id, submission_url]
      );

      if (!rows[0]) throw new Error("Submission failed.");
      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  async getSubmissionById(id) {
    try {
      const { rows } = await query(`SELECT * FROM submissions WHERE id = $1`, [
        id,
      ]);
      if (!rows[0]) throw new Error("Submission not found");
      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  async getSubmissionsByAssignment(assignment_id) {
    try {
      const { rows } = await query(
        `SELECT * FROM submissions WHERE assignment_id = $1`,
        [assignment_id]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  },

  async getSubmissionsById(user_id) {
    try {
      const { rows } = await query(
        `SELECT * FROM submissions WHERE user_id = $1`,
        [user_id]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  },

  async updateSubmission(id, { grade, feedback }) {
    try {
      const { rows } = await query(
        `UPDATE submissions SET
           grade = $1,
           feedback = $2,
           updated_at = CURRENT_TIMESTAMP
         WHERE id = $3 RETURNING *`,
        [grade, feedback, id]
      );
      if (!rows[0]) throw new Error("Submission not found");
      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  async deleteSubmission(id) {
    try {
      const { rows } = await query(
        `DELETE FROM submissions WHERE id = $1 RETURNING *`,
        [id]
      );
      if (!rows[0]) throw new Error("Submission not found");
      return rows[0];
    } catch (error) {
      throw error;
    }
  },
  async getUngradedSubmissions() {
    const { rows } = await query(
      `SELECT * FROM submissions WHERE grade IS NULL`
    );
    return rows;
  },
};

export { assignmentSubmissionModel };
