import { Router } from "express";
import AuthController from "../controllers/authController.js";
import { athenticate } from "../middleware/auth.js";
const router = Router();
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/change-password", AuthController.changePassword);
router.post("/get-current-login-info", athenticate, AuthController.register);

export default router;
