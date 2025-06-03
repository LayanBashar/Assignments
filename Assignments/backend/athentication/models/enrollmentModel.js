// models/enrollmentModel.js
import { query } from "../config/db.js";

const enrollmentModel = {
  // 1. طالب: يسجل نفسه في كورس
  async enrollUser({ user_id, course_id }) {
    // تحقق من وجود تسجيل مسبق
    const existing = await enrollmentModel.getEnrollmentByUserAndCourse(
      user_id,
      course_id
    );
    if (existing) {
      throw new Error("User is already enrolled in this course");
    }
    const { rows } = await query(
      `INSERT INTO enrollments (user_id, course_id)
       VALUES ($1, $2) RETURNING *`,
      [user_id, course_id]
    );
    return rows[0];
  },

  // 2. طالب: يحصل على كل التسجيلات الخاصة به
  async getEnrollmentsByUser(user_id) {
    const { rows } = await query(
      `
    SELECT courses.id, courses.title, courses.description
    FROM enrollments
    JOIN courses ON enrollments.course_id = courses.id
    WHERE enrollments.user_id = $1
  `,
      [user_id]
    );

    return rows;
  },

  // 3. طالب أو إدمن: يحصل على تسجيل بعينه
  async getEnrollmentById(id) {
    const { rows } = await query(`SELECT * FROM enrollments WHERE id = $1`, [
      id,
    ]);
    if (!rows[0]) throw new Error("Enrollment not found");
    return rows[0];
  },

  // 4. إدمن/مدرّس: يحصل على كل التسجيلات
  async getAllEnrollments() {
    const { rows } = await query(
      `SELECT * FROM enrollments ORDER BY enrolled_at DESC`
    );
    return rows;
  },

  // 5. إدمن/مدرّس: يحصل على كل الطلاب المسجلين في كورس معيّن
  async getEnrollmentsByCourse(course_id) {
    const { rows } = await query(
      `
    SELECT users.id, users.name, users.email
    FROM enrollments
    JOIN users ON enrollments.user_id = users.id
    WHERE enrollments.course_id = $1
  `,
      [course_id]
    );

    return rows; // راح تكون مصفوفة من المستخدمين
  },

  // 6. طالب: يحدث تقدّمه (Progress) أو يُكمّل الكورس
  async updateEnrollmentProgress(id, { progress, completed_at = null }) {
    const { rows } = await query(
      `UPDATE enrollments
       SET progress = $1,
           completed_at = $2
       WHERE id = $3
       RETURNING *`,
      [progress, completed_at, id]
    );
    if (!rows[0]) throw new Error("Enrollment not found");
    return rows[0];
  },

  // 7. إدمن: يحذف تسجيل (مثلاً لإلغاء تسجيل)
  async unenrollUser(id) {
    const { rows } = await query(
      `DELETE FROM enrollments WHERE id = $1 RETURNING *`,
      [id]
    );
    if (!rows[0]) throw new Error("Enrollment not found");
    return rows[0];
  },

  // مساعدة داخلية لمنع التكرار
  async getEnrollmentByUserAndCourse(user_id, course_id) {
    const { rows } = await query(
      `SELECT * FROM enrollments
       WHERE user_id = $1 AND course_id = $2`,
      [user_id, course_id]
    );
    return rows[0];
  },

  async findOne({ course_id, user_id }) {
    const { rows } = await query(
      `SELECT * FROM enrollments WHERE course_id = $1 AND user_id = $2`,
      [course_id, user_id]
    );
    return rows[0];
  },

  async deleteOne({ course_id, user_id }) {
    await query(
      `DELETE FROM enrollments WHERE course_id = $1 AND user_id = $2`,
      [course_id, user_id]
    );
  },

  async countEnrollmentsByCourse(course_id) {
    const { rows } = await query(
      `SELECT COUNT(*) FROM enrollments WHERE course_id = $1`,
      [course_id]
    );
    return parseInt(rows[0].count);
  },
  async countEnrollments(req, res, next) {
    try {
      const courseId = req.params.courseId;
      const count = await enrollmentModel.countEnrollmentsByCourse(courseId);
      return res.status(200).json({ courseId, enrolledCount: count });
    } catch (error) {
      next(error);
    }
  },

  // 12. جلب تقدم الطالب في كورس معيّن
  // async getEnrollmentProgress(user_id, course_id) {
  //   const { rows } = await query(
  //     `SELECT progress, completed_at
  //      FROM enrollments
  //      WHERE user_id = $1 AND course_id = $2`,
  //     [user_id, course_id]
  //   );

  //   if (!rows[0]) {
  //     throw new Error("Enrollment not found");
  //   }

  //   return rows[0]; // رح يحتوي على { progress, completed_at }
  // },
};

export default enrollmentModel;
