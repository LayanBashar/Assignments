import courseModel from "../models/courseModel.js";
import { courseSchema } from "../utils/validation.js";

const CourseController = {
  async createCourse(req, res, next) {
    try {
      // التحقق من صحة البيانات
      const { error, value } = courseSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
          success: false,
          message: error.details[0].message,
        });
      }

      const {
        title,
        description,
        category_id,
        thumbnail_url,
        is_published,
        is_approved,
      } = value;

      // التحقق إذا الكورس موجود مسبقًا
      const existingCourse = await courseModel.findByTitle(title);
      if (existingCourse) {
        return res.status(409).json({
          success: false,
          message: "Course with this title already exists",
        });
      }

      // إضافة id المدرّس من الجلسة
      const instructor_id = req.user.id;

      // إنشاء الكورس الجديد
      const newCourse = await courseModel.createCourse({
        title,
        description,
        instructor_id,
        category_id,
        thumbnail_url,
        is_published,
        is_approved,
      });

      res.status(201).json({
        success: true,
        course: newCourse,
      });
    } catch (error) {
      next(error);
    }
  },

  async getAllCourses(req, res, next) {
    try {
      const courses = await courseModel.findAllCourses();
      res.status(200).json({
        success: true,
        courses,
      });
    } catch (error) {
      next(error);
    }
  },

  async getCourseById(req, res, next) {
    try {
      const { id } = req.params;
      const course = await courseModel.findCourseById(id);
      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Course not found",
        });
      }
      res.status(200).json({
        success: true,
        course,
      });
    } catch (error) {
      next(error);
    }
  },

  async updateCourse(req, res, next) {
    try {
      const { id } = req.params;
      const { error, value } = courseSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
          success: false,
          message: error.details[0].message,
        });
      }

      const updatedCourse = await courseModel.updateCourse(id, value);
      if (!updatedCourse) {
        return res.status(404).json({
          success: false,
          message: "Course not found",
        });
      }

      res.status(200).json({
        success: true,
        course: updatedCourse,
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteCourse(req, res, next) {
    try {
      const { id } = req.params;
      const deletedCourse = await courseModel.deleteCourse(id);
      if (!deletedCourse) {
        return res.status(404).json({
          success: false,
          message: "Course not found",
        });
      }
      res.status(200).json({
        success: true,
        message: "Course deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  },
};

export default CourseController;
