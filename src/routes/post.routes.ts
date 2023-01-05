import { Router } from "express";
import { getPosts, createPost, getPost, deletePost, updatePost } from "../controllers/post.controller";

const router = Router();

router.get("/", getPosts).post("/", createPost);

router.get("/:postId", getPost).delete("/:postId", deletePost).put("/:postId", updatePost);

export default router;