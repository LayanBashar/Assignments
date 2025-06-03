import categoryModel from "../models/categoryModel.js";
import { categorySchema } from "../utils/validation.js";

const CategoryController = {
  async createCategory(req, res, next) {
    try {
      const { error, value } = categorySchema.validate(req.body);
      if (error)
        return res.status(400).json({ message: error.details[0].message });

      const category = await categoryModel.createCategory(value);
      res.status(201).json({ category });
    } catch (error) {
      if (error.message === "Category already exists") {
        return res.status(409).json({ message: error.message });
      }
      next(error);
    }
  },

  async findAllCategories(req, res, next) {
    try {
      const categories = await categoryModel.findAllCategories();
      res.json({ categories });
    } catch (error) {
      next(error);
    }
  },

  async findCategoryById(req, res, next) {
    try {
      const { id } = req.params;
      const category = await categoryModel.findCategoryById(id);
      res.json({ category });
    } catch (error) {
      if (error.message === "Category not found") {
        return res.status(404).json({ message: error.message });
      }
      next(error);
    }
  },

  async updateCategory(req, res, next) {
    try {
      const { id } = req.params;
      const { error, value } = categorySchema.validate(req.body);
      if (error)
        return res.status(400).json({ message: error.details[0].message });

      const updated = await categoryModel.updateCategory(id, value);
      res.json({ category: updated });
    } catch (error) {
      if (error.message === "Category not found") {
        return res.status(404).json({ message: error.message });
      }
      next(error);
    }
  },

  async deleteCategory(req, res, next) {
    try {
      const { id } = req.params;
      await categoryModel.deleteCategory(id);
      res.json({ message: "Category deleted successfully" });
    } catch (error) {
      if (error.message === "Category not found") {
        return res.status(404).json({ message: error.message });
      }
      next(error);
    }
  },

  async getCoursesByCategoryId(req, res, next) {
    try {
      const { id } = req.params;
      const courses = await categoryModel.getCoursesByCategoryId(id);
      res.json({ courses });
    } catch (error) {
      next(error);
    }
  },
};
export default CategoryController;
