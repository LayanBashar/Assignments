import assignmentModel from "../models/assignmentModel.js"; // ✅ استخدمنا default import
import { assignmentSchema } from "../utils/validation.js";

const assignmentController = {
  async createAssignment(req, res, next) {
    try {
      const { error, value } = assignmentSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const { lessonId, title, description, deadline, maxScore = 100 } = value;

      const newAssignment = await assignmentModel.createAssignment({
        lesson_id: lessonId,
        title,
        description,
        deadline,
        max_score: maxScore,
      });

      return res.status(201).json({
        message: "Assignment created successfully",
        assignment: newAssignment,
      });
    } catch (error) {
      next(error);
    }
  },

  async updateAssignment(req, res, next) {
    try {
      const { id } = req.params;
      const { error, value } = assignmentSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const { lessonId, title, description, deadline, maxScore = 100 } = value;

      const updatedAssignment = await assignmentModel.updateAssignment(id, {
        lesson_id: lessonId,
        title,
        description,
        deadline,
        max_score: maxScore,
      });

      if (!updatedAssignment) {
        return res.status(404).json({ message: "Assignment not found" });
      }

      return res.status(200).json({
        message: "Assignment updated successfully",
        assignment: updatedAssignment,
      });
    } catch (error) {
      next(error);
    }
  },

  async getAssignmentById(req, res, next) {
    try {
      const { id } = req.params;
      const assignment = await assignmentModel.getAssignmentById(id);
      return res.status(200).json({ assignment });
    } catch (error) {
      next(error);
    }
  },

  async getAssignmentById(req, res, next) {
    try {
      const { id } = req.params;
      const assignment = await assignmentModel.getAssignmentById(id);
      if (!assignment) {
        return res.status(404).json({ message: "Assignment not found" });
      }
      return res.status(200).json({ assignment });
    } catch (error) {
      next(error);
    }
  },
  async deleteAssignment(req, res, next) {
    try {
      const { id } = req.params;
      const deletedAssignment = await assignmentModel.deleteAssignment(id);
      return res.status(200).json({
        message: "Assignment deleted successfully",
        assignment: deletedAssignment,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default assignmentController;
