import moduleModel from "../models/moduleModel.js";
import { moduleSchema } from "../utils/validation.js";

const moduleController = {
  async createModule(req, res, next) {
    try {
      const { error, value } = moduleSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const { courseId, title, description } = value;

      // التحقق إذا الموديول موجود مسبقًا
      const existingModule = await moduleModel.findByTitleAndCourseId(
        title,
        courseId
      );
      if (existingModule) {
        return res.status(409).json({
          message: "Module with this title already exists in the course",
        });
      }

      const newModule = await moduleModel.createModule({
        course_id: courseId,
        title,
        description,
      });

      return res.status(201).json({
        message: "Module created successfully",
        module: newModule,
      });
    } catch (error) {
      next(error);
    }
  },

  async updateModule(req, res, next) {
    try {
      const { id } = req.params;
      const { error, value } = moduleSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const { courseId, title, description } = value;

      // التحقق إذا الموديول موجود مسبقًا
      const existingModule = await moduleModel.findByTitleAndCourseId(
        title,
        courseId
      );
      if (existingModule && existingModule.id !== id) {
        return res.status(409).json({
          message: "Module with this title already exists in the course",
        });
      }

      const updatedModule = await moduleModel.updateModule(id, {
        course_id: courseId,
        title,
        description,
      });

      if (!updatedModule) {
        return res.status(404).json({ message: "Module not found" });
      }

      return res.status(200).json({
        message: "Module updated successfully",
        module: updatedModule,
      });
    } catch (error) {
      next(error);
    }
  },

  async getModuleById(req, res, next) {
    try {
      const { id } = req.params;
      const module = await moduleModel.getModuleById(id);
      if (!module) {
        return res.status(404).json({ message: "Module not found" });
      }
      res.json(module);
    } catch (error) {
      next(error);
    }
  },

  async getModulesByCourse(req, res, next) {
    try {
      const { course_id } = req.params;
      const modules = await moduleModel.getModulesByCourse(course_id);
      res.json(modules);
    } catch (error) {
      next(error);
    }
  },

  async deleteModule(req, res, next) {
    try {
      const { id } = req.params;
      const deletedModule = await moduleModel.deleteModule(id);
      if (!deletedModule) {
        return res.status(404).json({ message: "Module not found" });
      }
      res.status(200).json({ message: "Module deleted successfully" });
    } catch (error) {
      next(error);
    }
  },

  async getAllModules(req, res, next) {
    try {
      const modules = await moduleModel.getAllModules();
      res.json(modules);
    } catch (error) {
      next(error);
    }
  },

  async getModuleByCourseAndOrder(req, res, next) {
    try {
      const { course_id, order } = req.params;
      const module = await moduleModel.getModuleByCourseAndOrder(
        course_id,
        order
      );
      if (!module) {
        return res.status(404).json({ message: "Module not found" });
      }
      res.json(module);
    } catch (error) {
      next(error);
    }
  },

  async countModulesByCourse(req, res, next) {
    try {
      const { course_id } = req.params;
      const count = await moduleModel.countModulesByCourse(course_id);
      res.json({ count });
    } catch (error) {
      next(error);
    }
  },
};
export default moduleController;
