import CourseController from "../controllers/couseController.js";
import { Router } from "express";
const router = Router();

// /courses	GET	Get all courses
// /courses/:id	GET	Get course details
// /courses	POST	Create new course (Instructor)
// /courses/:id	PUT	Update course (Instructor)
// /courses/:id	DELETE	Delete course (Instructor/Admin)

router.get("courses", CourseController.getAllCourses);
router.get("/courses/:id", CourseController.getCourseById);
router.post("/courses", CourseController.createCourse);
router.put("/courses/:id", CourseController.updateCourse);
router.delete("/courses/:id", CourseController.deleteCourse);

// // routes/courseRoutes.js
// import express from "express";
// import courseController from "../controllers/courseController.js";
// import { authenticateToken } from "../middlewares/auth.js";
// import { authorizeRoles } from "../middlewares/authorize.js";

// // Everyone can view
// router.get("/", courseController.getAllCourses);
// router.get("/:id", courseController.getCourseById);

// // Only instructors can create
// router.post(
//   "/",
//   authenticateToken,
//   authorizeRoles("instructor"),
//   courseController.createCourse
// );

// // Only instructors can update
// router.put(
//   "/:id",
//   authenticateToken,
//   authorizeRoles("instructor"),
//   courseController.updateCourse
// );

// // Only instructors and admins can delete
// router.delete(
//   "/:id",
//   authenticateToken,
//   authorizeRoles("instructor", "admin"),
//   courseController.deleteCourse
// );

export default router;
