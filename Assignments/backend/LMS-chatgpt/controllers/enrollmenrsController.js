import EnrollmentModel from "../models/enrollmentsModel.js";

const EnrollmentsController = {
  async enroll(req, res, next) {
    try {
      const { user_id, course_id } = req.body;
      const result = await EnrollmentModel.enroll(user_id, course_id);
      res.status(201).json({ success: true, enrollment: result });
    } catch (error) {
      next(error);
    }
  },

  async getAll(req, res, next) {
    try {
      const enrollments = await EnrollmentModel.getAll();
      res.json({ success: true, enrollments });
    } catch (error) {
      next(error);
    }
  },

  async getByUser(req, res, next) {
    try {
      const { userId } = req.params;
      const result = await EnrollmentModel.getByUser(userId);
      res.json({ success: true, enrollments: result });
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const result = await EnrollmentModel.deleteEnrollment(id);
      if (!result)
        return res
          .status(404)
          .json({ success: false, message: "Enrollment not found" });
      res.json({ success: true, message: "Enrollment deleted" });
    } catch (error) {
      next(error);
    }
  },
};

export default EnrollmentsController;
