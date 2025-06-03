import enrollmentModel from "../models/enrollmentModel.js";
import courseModel from "../models/courseModel.js";
import userModel from "../models/userModel.js";
const enrollmentController = {
  async enroll(req, res, next) {
    try {
      const { courseId, userId } = req.body;
      const course = await courseModel.findById(courseId);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const existingEnrollment = await enrollmentModel.findOne({
        course: courseId,
        user: userId,
      });
      if (existingEnrollment) {
        return res
          .status(400)
          .json({ message: "User already enrolled in this course" });
      }
      const enrollment = new enrollmentModel({
        course: courseId,
        user: userId,
      });
      await enrollment.save();
      return res
        .status(201)
        .json({ message: "Enrollment successful", enrollment });
    } catch (error) {
      next(error);
    }
  },

  async unenrollUser(req, res, next) {
    try {
      const { courseId, userId } = req.body;

      const enrollment = await enrollmentModel.findOne({
        course_id: courseId,
        user_id: userId,
      });

      if (!enrollment) {
        return res.status(404).json({ message: "Enrollment not found" });
      }

      await enrollmentModel.deleteOne({
        course_id: courseId,
        user_id: userId,
      });

      return res.status(200).json({ message: "Unenrollment successful" });
    } catch (error) {
      next(error);
    }
  },

  async getEnrollmentsByCourse(req, res, next) {
    try {
      const courseId = req.params.courseId; // ممكن يجي من URL زي: /enrollments/course/3

      const users = await enrollmentModel.getEnrollmentsByCourse(courseId);

      return res.status(200).json({ users });
    } catch (error) {
      next(error);
    }
  },

  async getEnrollmentsByUser(req, res, next) {
    try {
      const userId = req.params.userId; // أو ممكن من التوكن إذا فيه تسجيل دخول

      const courses = await enrollmentModel.getEnrollmentsByUser(userId);

      return res.status(200).json({ courses });
    } catch (error) {
      next(error);
    }
  },

  //   async getProgress(req, res, next) {
  //     try {
  //       const { userId, courseId } = req.params;

  //       const progress = await enrollmentModel.getEnrollmentProgress(
  //         userId,
  //         courseId
  //       );

  //       return res.status(200).json({ progress });
  //     } catch (error) {
  //       next(error);
  //     }
  //   },
};
export default enrollmentController;
