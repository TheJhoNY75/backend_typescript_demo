import { Router } from "express";
import {
  getPosts,
  createPost,
  getPost,
  deletePost,
  updatePost,
} from "../controllers/post.controller";
import { validateToken, validatePost, validatePostId } from "../middlewares";

const router = Router();

/**
 * @swagger
 * tags:
 *  name: Post
 *  description: The post API
 */

router.get("/", validateToken, getPosts);

router.post("/", validateToken, validatePost, createPost);

router.put("/", validateToken, validatePostId);

router.delete("/", validateToken, validatePostId);

router.get("/:postId", validateToken, getPost);

router.delete("/:postId", validateToken, deletePost);

router.put("/:postId", validateToken, validatePost, updatePost);

export default router;
