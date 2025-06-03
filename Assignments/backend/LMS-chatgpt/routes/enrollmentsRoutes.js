import express from "express";
import EnrollmentsController from "../controllers/enrollmentsController.js";

const router = express.Router();

router.post("/", EnrollmentsController.enroll); // تسجيل طالب في دورة
router.get("/", EnrollmentsController.getAll); // عرض كل التسجيلات
router.get("/:userId", EnrollmentsController.getByUser); // عرض تسجيلات طالب معيّن
router.delete("/:id", EnrollmentsController.delete); // حذف تسجيل

export default router;
