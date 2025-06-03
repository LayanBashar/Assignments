import { query } from "../config/db.js";

const courseModel = {
  async createCourse({
    title,
    description,
    instructor_id,
    category_id = null,
    thumbnail_url = null,
    is_published = false,
    is_approved = false,
  }) {
    try {
      const { rows } = await query(
        `INSERT INTO courses (
          title, description, instructor_id, category_id, 
          thumbnail_url, is_published, is_approved
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *`,
        [
          title,
          description,
          instructor_id,
          category_id,
          thumbnail_url,
          is_published,
          is_approved,
        ]
      );
      return rows[0];
    } catch (error) {
      if (error.code === "23505") {
        throw new Error("Course already exists");
      }
      throw error;
    }
  },

  async findAllCourses() {
    try {
      const { rows } = await query(
        `SELECT id, title, description, instructor_id, category_id, thumbnail_url, is_published, is_approved, created_at FROM courses`
      );
      return rows;
    } catch (error) {
      throw error;
    }
  },
  async findCourseById(courseId) {
    try {
      const { rows } = await query(
        `SELECT id, title, description, instructor_id, 
        category_id, thumbnail_url, is_published, is_approved, created_at
       FROM courses WHERE id=$1`,
        [courseId]
      );
      if (rows.length > 0) {
        return rows[0];
      } else {
        throw new Error("Course not found");
      }
    } catch (error) {
      throw error;
    }
  },

  async updateCourse(courseId, updateCourse) {
    try {
      const { rows } = await query(
        `UPDATE courses SET 
        title = $1, 
        description = $2, 
        instructor_id = $3, 
        category_id = $4, 
        thumbnail_url = $5, 
        is_published = $6, 
        is_approved = $7 
      WHERE id = $8 
      RETURNING *`,
        [
          updateCourse.title,
          updateCourse.description,
          updateCourse.instructor_id,
          updateCourse.category_id,
          updateCourse.thumbnail_url,
          updateCourse.is_published,
          updateCourse.is_approved,
          courseId,
        ]
      );

      if (rows.length > 0) {
        return rows[0];
      } else {
        throw new Error("Course not found");
      }
    } catch (error) {
      throw error;
    }
  },

  async deleteCourse(courseId) {
    try {
      const { rowCount } = await query(`DELETE FROM courses WHERE id = $1`, [
        courseId,
      ]);
      if (rowCount === 0) {
        throw new Error("Course not found");
      }
      return { message: "Course deleted successfully" };
    } catch (error) {
      throw error;
    }
  },

  async findCourseByTitle(title) {
    try {
      const { rows } = await query(
        `SELECT id, title, description, instructor_id, 
        category_id, thumbnail_url, is_published, is_approved, created_at
       FROM courses WHERE title=$1`,
        [title]
      );
      if (rows.length > 0) {
        return rows[0];
      } else {
        throw new Error("Course not found");
      }
    } catch (error) {
      throw error;
    }
  },
};

export default courseModel;
