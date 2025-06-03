import { Router } from "express";
import CoursesController from "../controllers/coursesController.js";
import { athenticate } from "../middleware/auth.js";

const router = Router();

// لازم يكون المستخدم مسجل دخول
router.get("/", CoursesController.getAll);
router.get("/:id", CoursesController.getById);
router.post("/", athenticate, CoursesController.create);
router.put("/:id", athenticate, CoursesController.update);
router.delete("/:id", athenticate, CoursesController.delete);

export default router;
