"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_controller_1 = require("../controllers/post.controller");
const router = (0, express_1.Router)();
router.get("/", post_controller_1.getPosts).post("/", post_controller_1.createPost);
router.get("/:postId", post_controller_1.getPost).delete("/:postId", post_controller_1.deletePost).put("/:postId", post_controller_1.updatePost);
exports.default = router;
//# sourceMappingURL=post.routes.js.map