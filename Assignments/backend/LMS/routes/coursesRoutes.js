import { Router } from "express";
import CourseController from "../controllers/coursesController.js";
import { authenticate } from "../middleware/auth.js";
import { auth } from "../middleware/auth.js"; // تأكد من وجود هذا الملف

const router = Router();

// فقط المدرسين يمكنهم إنشاء كورس جديد
router.post(
  "/courses	",
  authenticate,
  auth("instructor"),
  CourseController.createCourse
);

export default router;
