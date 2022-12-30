import express from "express";
import {
  getPosts,
  createPost,
  deletePost,
  likePost,
  updatePost,
} from "../controllers/posts.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", auth, createPost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);
router.put("/:id/updatePost", auth, updatePost);

export default router;
