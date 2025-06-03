import CourseModel from "../models/coursesModel.js";

const CoursesController = {
  async getAll(req, res, next) {
    try {
      const courses = await CourseModel.getAll();
      res.json({ success: true, courses });
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    try {
      const course = await CourseModel.getById(req.params.id);
      if (!course) return res.status(404).json({ message: "Course not found" });
      res.json({ success: true, course });
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const { title, description } = req.body;
      const instructor_id = req.user.id; // يفترض إنه مسجّل ومحقق
      const newCourse = await CourseModel.create({
        title,
        description,
        instructor_id,
      });
      res.status(201).json({ success: true, course: newCourse });
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { title, description } = req.body;
      const updated = await CourseModel.update(req.params.id, {
        title,
        description,
      });
      res.json({ success: true, course: updated });
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      await CourseModel.delete(req.params.id);
      res.json({ success: true, message: "Course deleted successfully" });
    } catch (error) {
      next(error);
    }
  },
};

export default CoursesController;
