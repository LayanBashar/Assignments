import express from "express";
import {
  createPost,
  getPosts,
  updatePosts,
  deletePost,
} from "../controllers/postControllers.js";
const router = express.Router();

router.get("/", getPosts);
router.get("/createPost", createPost);
router.get("/update/:id", updatePosts);
router.get("/delete/:id", deletePost);

export default router;
