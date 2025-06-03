import { query } from "../config/db.js";

const assignmentModel = {
  // إنشاء واجب جديد
  async createAssignment({
    lesson_id,
    title,
    description,
    deadline,
    max_score = 100,
  }) {
    const { rows } = await query(
      `INSERT INTO assignments (lesson_id, title, description, deadline, max_score)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [lesson_id, title, description, deadline, max_score]
    );
    if (!rows[0]) throw new Error("Assignment creation failed");
    return rows[0];
  },

  // جلب واجب بالمعرف
  async getAssignmentById(id) {
    const { rows } = await query(`SELECT * FROM assignments WHERE id = $1`, [
      id,
    ]);
    if (!rows[0]) throw new Error("Assignment not found");
    return rows[0];
  },

  // جلب جميع الواجبات لدرس معيّن
  async getAssignmentsByLessonId(lesson_id) {
    const { rows } = await query(
      `SELECT * FROM assignments WHERE lesson_id = $1 ORDER BY created_at ASC`,
      [lesson_id]
    );
    return rows;
  },

  // تحديث واجب
  async updateAssignment(
    id,
    { lesson_id, title, description, deadline, max_score }
  ) {
    const { rows } = await query(
      `UPDATE assignments SET
         lesson_id = $1,
         title = $2,
         description = $3,
         deadline = $4,
         max_score = $5,
         updated_at = CURRENT_TIMESTAMP
       WHERE id = $6 RETURNING *`,
      [lesson_id, title, description, deadline, max_score, id]
    );
    if (!rows[0]) throw new Error("Assignment not found");
    return rows[0];
  },

  // حذف واجب
  async deleteAssignment(id) {
    const { rows } = await query(
      `DELETE FROM assignments WHERE id = $1 RETURNING *`,
      [id]
    );
    if (!rows[0]) throw new Error("Assignment not found");
    return rows[0];
  },
};

export default assignmentModel;
