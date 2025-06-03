import { query } from "../config/db.js";

const categoryModel = {
  async createCategory({ name }) {
    try {
      const existing = await query(
        `SELECT id FROM categories WHERE name = $1`,
        [name]
      );
      if (existing.rows.length > 0) {
        throw new Error("Category already exists");
      }

      const { rows } = await query(
        `INSERT INTO categories (name) VALUES ($1) RETURNING id, name, created_at`,
        [name]
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  async findAllCategories() {
    try {
      const { rows } = await query(`SELECT name FROM categories`);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  async findCategoryById(categoryId) {
    try {
      const { rows } = await query(
        `SELECT  id, name, created_at FROM categories WHERE id=$1`,
        [categoryId]
      );
      if (rows.length > 0) {
        return rows[0];
      } else {
        throw new Error("Category not found");
      }
    } catch (error) {
      throw error;
    }
  },

  async updateCategory(categoryId, { name }) {
    try {
      const { rows } = await query(
        `UPDATE categories SET name=$1 WHERE id=$2 RETURNING id, name`,
        [name, categoryId]
      );
      if (rows.length > 0) {
        return rows[0];
      } else {
        throw new Error("Category not found");
      }
    } catch (error) {
      throw error;
    }
  },
  async deleteCategory(categoryId) {
    try {
      const { rows } = await query(
        `DELETE FROM categories WHERE id=$1 RETURNING id`,
        [categoryId]
      );
      if (rows.length > 0) {
        return rows[0];
      } else {
        throw new Error("Category not found");
      }
    } catch (error) {
      throw error;
    }
  },

  async getCoursesByCategoryId(category_id) {
    const { rows } = await query(
      `SELECT c.id, c.title, c.description, c.instructor_id, c.created_at
       FROM courses c
       WHERE c.category_id = $1
       ORDER BY c.created_at DESC`,
      [category_id]
    );
    return rows;
  },
};

export default categoryModel;
