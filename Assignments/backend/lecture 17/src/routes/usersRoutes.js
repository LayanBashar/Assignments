import express from "express";
import { createUsers, getUsers } from "../controllers/usersController";
const router = express.Router();

router.get("/", getUsers);
router.get("/createUser", createUsers);
router.get("/update/:id", updateUsers);
router.get("/delete/:id", deleteUser);

export default router;
