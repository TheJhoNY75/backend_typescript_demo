"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_controller_1 = require("../controllers/post.controller");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /api/post:
 * get:
 *   summary: Get all posts
 */
router.get("/", middlewares_1.validateToken, post_controller_1.getPosts);
router.post("/", middlewares_1.validateToken, middlewares_1.validatePost, post_controller_1.createPost);
router.put("/", middlewares_1.validateToken, middlewares_1.validatePostId);
router.delete("/", middlewares_1.validateToken, middlewares_1.validatePostId);
router.get("/:postId", middlewares_1.validateToken, post_controller_1.getPost);
router.delete("/:postId", middlewares_1.validateToken, post_controller_1.deletePost);
router.put("/:postId", middlewares_1.validateToken, middlewares_1.validatePost, post_controller_1.updatePost);
exports.default = router;
//# sourceMappingURL=post.routes.js.map