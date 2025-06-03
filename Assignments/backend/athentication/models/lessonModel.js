import { query } from "../config/db.js";

const lessonModel = {
  // إنشاء درس جديد
  async createLesson({
    module_id,
    title,
    content_type,
    content_url = null,
    duration = 0,
    order,
  }) {
    // منع التكرار في الترتيب
    const existing = await lessonModel.getLessonByModuleAndOrder(
      module_id,
      order
    );
    if (existing) {
      throw new Error("Lesson order already exists in this module");
    }

    const { rows } = await query(
      `INSERT INTO lessons (
         module_id, title, content_type, content_url,
         duration, "order"
       ) VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [module_id, title, content_type, content_url, duration, order]
    );

    if (!rows[0]) throw new Error("Lesson creation failed");
    return rows[0];
  },

  // تحديث درس موجود
  async updateLesson(
    id,
    { title, content_type, content_url = null, duration, order }
  ) {
    const { rows } = await query(
      `UPDATE lessons SET
         title = $1,
         content_type = $2,
         content_url = $3,
         duration = $4,
         "order" = $5,
         updated_at = CURRENT_TIMESTAMP
       WHERE id = $6
       RETURNING *`,
      [title, content_type, content_url, duration, order, id]
    );

    if (!rows[0]) throw new Error("Lesson not found");
    return rows[0];
  },

  // حذف درس
  async deleteLesson(id) {
    const { rows } = await query(
      `DELETE FROM lessons WHERE id = $1 RETURNING *`,
      [id]
    );
    if (!rows[0]) throw new Error("Lesson not found");
    return rows[0];
  },

  // جلب درس حسب المعرف
  async getLessonById(id) {
    const { rows } = await query(`SELECT * FROM lessons WHERE id = $1`, [id]);
    if (!rows[0]) throw new Error("Lesson not found");
    return rows[0];
  },

  // جلب كل الدروس لموديول معين
  async getLessonsByModuleId(module_id) {
    const { rows } = await query(
      `SELECT * FROM lessons
       WHERE module_id = $1
       ORDER BY "order" ASC`,
      [module_id]
    );
    return rows;
  },

  // مساعدة لمنع التكرار في الترتيب داخل نفس الموديول
  async getLessonByModuleAndOrder(module_id, order) {
    const { rows } = await query(
      `SELECT * FROM lessons
       WHERE module_id = $1 AND "order" = $2`,
      [module_id, order]
    );
    return rows[0];
  },

  async getLessonsByCourseId(course_id) {
    const { rows } = await query(
      `SELECT lessons.* FROM lessons
     JOIN modules ON lessons.module_id = modules.id
     WHERE modules.course_id = $1
     ORDER BY modules.order ASC, lessons.order ASC`,
      [course_id]
    );
    return rows;
  },
};

export default lessonModel;
