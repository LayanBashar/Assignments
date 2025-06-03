import { query } from "../config/db.js";

const moduleModel = {
  async createModule({ course_id, title, description, order }) {
    const existing = await moduleModel.getModuleByCourseAndOrder(
      course_id,
      order
    );
    if (existing) {
      throw new Error("Module order already exists for this course");
    }
    try {
      const { rows } = await query(
        `INSERT INTO modules (course_id, title, description, "order")
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [course_id, title, description, order]
      );
      if (!rows[0]) {
        throw new Error("Module creation failed");
      }
      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  // تحديث وحدة
  async updateModule(id, { course_id, title, description, order }) {
    try {
      const { rows } = await query(
        `UPDATE modules
         SET course_id = $1, title = $2, description = $3, "order" = $4, 
         updated_at = CURRENT_TIMESTAMP
         WHERE id = $5 RETURNING *`,
        [course_id, title, description, order, id]
      );
      if (!rows[0]) {
        throw new Error("Module not found");
      }
      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  // جلب جميع الوحدات
  async getAllModules() {
    try {
      const { rows } = await query(
        `SELECT * FROM modules ORDER BY "order" ASC`
      );
      return rows;
    } catch (error) {
      throw error;
    }
  },

  // جلب وحدة بالمعرّف
  async getModuleById(id) {
    try {
      const { rows } = await query(`SELECT * FROM modules WHERE id = $1`, [id]);
      if (!rows[0]) {
        throw new Error("Module not found");
      }
      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  // جلب وحدة حسب الكورس والترتيب (لمنع التكرار)
  async getModuleByCourseAndOrder(course_id, order) {
    try {
      const { rows } = await query(
        `SELECT * FROM modules WHERE course_id = $1 AND "order" = $2`,
        [course_id, order]
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  // حذف وحدة
  async deleteModule(id) {
    try {
      const { rows } = await query(
        `DELETE FROM modules WHERE id = $1 RETURNING *`,
        [id]
      );
      if (!rows[0]) {
        throw new Error("Module not found");
      }
      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  async getModulesByCourseId(course_id) {
    const { rows } = await query(
      `SELECT * FROM modules WHERE course_id = $1 ORDER BY "order" ASC`,
      [course_id]
    );
    return rows;
  },

  async searchModulesByTitle(title) {
    const { rows } = await query(
      `SELECT * FROM modules WHERE title ILIKE $1 ORDER BY "order" ASC`,
      [`%${title}%`]
    );
    return rows;
  },

  async countModulesByCourse(course_id) {
    const { rows } = await query(
      `SELECT COUNT(*) FROM modules WHERE course_id = $1`,
      [course_id]
    );
    return Number(rows[0].count);
  },
};

export default moduleModel;
