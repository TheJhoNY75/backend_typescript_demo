import { Router } from "express";
import { getPosts, createPost, getPost, deletePost, updatePost } from "../controllers/post.controller";
import { validateToken, validatePost, validatePostId } from '../validate/index';

const router = Router();

router.get("/", validateToken, getPosts).post("/", validateToken, validatePost, createPost).delete("/", validateToken, validatePostId).put("/", validateToken, validatePostId);
router.get("/:postId", validateToken, getPost).delete("/:postId", validateToken, deletePost).put("/:postId", validateToken, validatePost , updatePost);

export default router;