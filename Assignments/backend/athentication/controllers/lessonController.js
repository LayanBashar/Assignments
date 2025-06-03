import lessonModel from "../models/lessonModel.js";
import { lessonSchema } from "../utils/validation.js";

const lessonController = {
  async createLesson(req, res, next) {
    try {
      const { error, value } = lessonSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const lesson = await lessonModel.createLesson(value);
      res.status(201).json({ message: "Lesson created successfully", lesson });
    } catch (error) {
      next(error);
    }
  },

  async updateLesson(req, res, next) {
    try {
      const { id } = req.params;
      const { error, value } = lessonSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const lesson = await lessonModel.updateLesson(id, value);
      res.status(200).json({ message: "Lesson updated successfully", lesson });
    } catch (error) {
      next(error);
    }
  },

    async deleteLesson(req, res, next) {
        try {
        const { id } = req.params;
        const lesson = await lessonModel.deleteLesson(id);
        res.status(200).json({ message: "Lesson deleted successfully", lesson });
        } catch (error) {
        next(error);
        }
    },

    async findAllLessons(req, res, next) {
        try {
            const lessons = await lessonModel.findAllLessons();
            res.status(200).json({ lessons });
        } catch (error) {
            next(error);
        }
    }


    async findLessonById(req, res, next) {
        try {
            const { id } = req.params;
            const lesson = await lessonModel.findLessonById(id);
            if (!lesson) {
                return res.status(404).json({ message: "Lesson not found" });
            }
            res.status(200).json({ lesson });
        } catch (error) {
            next(error);
        }
    }
    ,

    async findLessonsByModuleId(req, res, next) {
        try {
            const { module_id } = req.params;
            const lessons = await lessonModel.findLessonsByModuleId(module_id);
            res.status(200).json({ lessons });
        } catch (error) {
            next(error);
        }
    }
    ,
    async findLessonsByCourseId(req, res, next) {
        try {
            const { course_id } = req.params;
            const lessons = await lessonModel.findLessonsByCourseId(course_id);
            res.status(200).json({ lessons });
        } catch (error) {
            next(error);
        }
    },

async findLessonsByCourseId(req, res, next) {
    try {
        const { course_id } = req.params;
        // استدعاء الدالة من الموديل وتمرير course_id
        const lessons = await lessonModel.getLessonsByCourseId(course_id);
        res.status(200).json({ lessons });
    } catch (error) {
        next(error);
    }
},
};

export default lessonController;
