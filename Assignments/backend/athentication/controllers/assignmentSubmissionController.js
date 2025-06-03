import { submissionSchema } from "../utils/validation.js";
import assignmentSubmissionModel from "../models/assignmentSubmissionModel.js";

const assignmentSubmissionController = {
  async createSubmission(req, res, next) {
    try {
      const { error, value } = submissionSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const { assignment_id, submission_url } = value;
      const user_id = req.user.id; // من التوكن

      const newSubmission = await assignmentSubmissionModel.createSubmission({
        assignment_id,
        user_id,
        submission_url,
      });

      res.status(201).json({
        message: "Assignment submission created successfully",
        submission: newSubmission,
      });
    } catch (error) {
      next(error);
    }
  },

  async getSubmissionById(req, res, next) {
    try {
      const { id } = req.params;
      const submission = await assignmentSubmissionModel.getSubmissionById(id);
      if (!submission) {
        return res.status(404).json({ message: "Submission not found" });
      }
      res.json(submission);
    } catch (error) {
      next(error);
    }
  },

  async getSubmissionsByAssignment(req, res, next) {
    try {
      const { assignment_id } = req.params;
      const submissions =
        await assignmentSubmissionModel.getSubmissionsByAssignment(
          assignment_id
        );
      res.json(submissions);
    } catch (error) {
      next(error);
    }
  },

  async getSubmissionsById(req, res, next) {
    try {
      const { user_id } = req.params;
      const submissions = await assignmentSubmissionModel.getSubmissionsById(
        user_id
      );
      res.json(submissions);
    } catch (error) {
      next(error);
    }
  },
  async updateSubmission(req, res, next) {
    try {
      const { id } = req.params;
      const { grade, feedback } = req.body;
      const updated = await assignmentSubmissionModel.updateSubmission(id, {
        grade,
        feedback,
      });
      if (!updated) {
        return res.status(404).json({ message: "Submission not found" });
      }
      res.json(updated);
    } catch (error) {
      next(error);
    }
  },

  async deleteSubmission(req, res, next) {
    try {
      const { id } = req.params;
      const deleted = await assignmentSubmissionModel.deleteSubmission(id);
      if (!deleted) {
        return res.status(404).json({ message: "Submission not found" });
      }
      res.json({ message: "Submission deleted successfully" });
    } catch (error) {
      next(error);
    }
  },

  async getUngradedSubmissions(req, res, next) {
    try {
      const submissions =
        await assignmentSubmissionModel.getUngradedSubmissions();
      res.json(submissions);
    } catch (error) {
      next(error);
    }
  },
};

export default assignmentSubmissionController;
