import CourseModel from "../models/coursesModel.js";

const CourseController = {
  async createCourse(req, res, next) {
    try {
      const {
        title,
        description,
        instructor_id,
        category_id,
        thumbnail_url,
        is_published,
        is_approved,
      } = req.body;

      // يفضل نقل التحقق إلى middleware منفصل في المشاريع الكبيرة
      if (!title || !description || !instructor_id) {
        return res.status(400).json({
          success: false,
          message: "Title, description, and instructor_id are required",
        });
      }

      const newCourse = await CourseModel.createCourse({
        title,
        description,
        instructor_id,
        category_id: category_id ?? null,
        thumbnail_url: thumbnail_url ?? null,
        is_published: is_published ?? false,
        is_approved: is_approved ?? false,
      });

      res.status(201).json({
        success: true,
        data: newCourse,
      });
    } catch (error) {
      // يفضل توحيد معالجة الأخطاء في middleware عام
      next(error);
    }
  },
};

export default CourseController;
