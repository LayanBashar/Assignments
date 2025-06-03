import quiz_submissions from "../models/quizSubmissionModel.js";
import { submissionSchema } from "../validators/quizSubmissionValidator.js";

const quizSubmissionController = {
  async createSubmission(req, res, next) {
    try {
      const { error, value } = submissionSchema.validate(req.body);
      if (error)
        return res.status(400).json({ message: error.details[0].message });

      const user_id = req.user.id; // من التوكن
      const newSubmission = await quiz_submissions.createSubmission({
        ...value,
        user_id,
      });
      res.status(201).json({ submission: newSubmission });
    } catch (error) {
      next(error);
    }
  },

  async getSubmissionById(req, res, next) {
    try {
      const { id } = req.params;
      const submission = await quiz_submissions.getSubmissionById(id);
      if (!submission)
        return res.status(404).json({ message: "Submission not found" });
      res.json({ submission });
    } catch (error) {
      next(error);
    }
  },

  async getSubmissionsByQuizId(req, res, next) {
    try {
      const { quiz_id } = req.params;
      const submissions = await quiz_submissions.getSubmissionsByQuizId(
        quiz_id
      );
      res.json({ submissions });
    } catch (error) {
      next(error);
    }
  },

  async getSubmissionsByUserId(req, res, next) {
    try {
      const { user_id } = req.params;
      const submissions = await quiz_submissions.getSubmissionsByUserId(
        user_id
      );
      res.json({ submissions });
    } catch (error) {
      next(error);
    }
  },

  async updateSubmission(req, res, next) {
    try {
      const { id } = req.params;
      const { score } = req.body;
      const updated = await quiz_submissions.updateSubmission(id, { score });
      if (!updated)
        return res.status(404).json({ message: "Submission not found" });
      res.json({ submission: updated });
    } catch (error) {
      next(error);
    }
  },

  async deleteSubmission(req, res, next) {
    try {
      const { id } = req.params;
      await quiz_submissions.deleteSubmission(id);
      res.json({ message: "Submission deleted successfully" });
    } catch (error) {
      if (error.message === "Submission not found") {
        return res.status(404).json({ message: error.message });
      }
      next(error);
    }
  },
};
export default quizSubmissionController;
