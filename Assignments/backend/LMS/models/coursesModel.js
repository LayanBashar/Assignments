import { query } from "../config/db.js";

const CourseModel = {
  async createCourse({
    title,
    description,
    instructor_id,
    category_id = null,
    thumbnail_url = null,
    is_published = false,
    is_approved = false,
  }) {
    if (!title || !description || !instructor_id) {
      throw new Error("Title, description, and instructor_id are required");
    }

    try {
      const { rows } = await query(
        `INSERT INTO courses (
          title,
          description,
          instructor_id,
          category_id,
          thumbnail_url,
          is_published,
          is_approved
        ) VALUES ($1, $2, $3, $4, $5, $6, $7) 
        RETURNING id, title, description, instructor_id, category_id, thumbnail_url, is_published, is_approved, created_at`,
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

      if (!rows[0]) {
        throw new Error("Course creation failed - no data returned");
      }

      return rows[0];
    } catch (error) {
      if (error.code === "23503") {
        if (error.constraint === "courses_instructor_id_fkey") {
          throw new Error("Instructor not found");
        }
        if (error.constraint === "courses_category_id_fkey") {
          throw new Error("Category not found");
        }
        throw new Error("Database constraint violation");
      }
      if (error.code === "23502") {
        throw new Error("Missing required course fields");
      }
      if (error.code === "23505") {
        throw new Error("Course with similar attributes already exists");
      }
      // Log only in development
      if (process.env.NODE_ENV !== "production") {
        console.error("Database error in createCourse:", error);
      }
      throw new Error("Failed to create course");
    }
  },
};

export default CourseModel;
