"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePost = exports.deletePost = exports.getPost = exports.createPost = exports.getPosts = void 0;
const uuid_1 = require("uuid");
const database_1 = require("../database");
const sortByOptions = ["title", "description", "created_at", "updated_at"];
const orderOptions = ["ASC", "DESC"];
function getPosts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield (0, database_1.connect)();
        const limmit = req.query.limmit || 10;
        const page = req.query.page || 1;
        const sortBy = req.query.sortby || "created_at";
        const order = req.query.order || "ASC";
        const offset = (Math.floor(page) - 1) * Math.floor(limmit);
        const nextPageUrl = `/api/post?page=${Math.floor(page) + 1}&limmit=${limmit}&sortBy=${sortBy}&order=${order}`;
        const prevPageUrl = `/api/post?page=${Math.floor(page) - 1}&limmit=${limmit}&sortBy=${sortBy}&order=${order}`;
        if (!sortByOptions.includes(sortBy))
            return res.status(400).json({ message: "Invalid sortby option", valid_options: sortByOptions });
        if (!orderOptions.includes(order))
            return res.status(400).json({ message: "Invalid order option", valid_options: orderOptions });
        const totalPosts = yield conn.query("SELECT COUNT(*) as total FROM posts");
        const pages = Math.ceil(totalPosts[0][0].total / limmit) !== 0 ? Math.ceil(totalPosts[0][0].total / limmit) : 1;
        const next = page < pages ? nextPageUrl : null;
        const prev = page > 1 ? prevPageUrl : null;
        if (page > pages)
            return res.status(404).json({ message: "No more posts" });
        const posts = yield conn.query(`SELECT * FROM posts ORDER BY ${sortBy} ${order} LIMIT ?,?`, [Math.floor(offset), Math.floor(limmit)]);
        return res.json({ results: posts[0], info: { page: Math.floor(page), count: totalPosts[0][0].total, next, prev, pages } });
    });
}
exports.getPosts = getPosts;
function createPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newPost = req.body;
        const id = (0, uuid_1.v4)();
        const conn = yield (0, database_1.connect)();
        yield conn.query("INSERT INTO posts SET ?", [Object.assign({ id }, newPost)]);
        return res.json(Object.assign({ id }, newPost));
    });
}
exports.createPost = createPost;
function getPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.postId;
        const conn = yield (0, database_1.connect)();
        const [results] = yield conn.query("SELECT * FROM posts WHERE id = ?", [id]);
        if (results.length === 0)
            return res.status(404).json({ message: "Post not found" });
        return res.json(results[0]);
    });
}
exports.getPost = getPost;
function deletePost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.postId;
        const conn = yield (0, database_1.connect)();
        const results = yield conn.query("DELETE FROM posts WHERE id = ?", [id]);
        if (results[0].affectedRows === 0)
            return res.status(404).json({ message: "Post not found to delete" });
        return res.json({ message: "Post deleted" });
    });
}
exports.deletePost = deletePost;
function updatePost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.postId;
        const { title, description, image_url } = req.body;
        const conn = yield (0, database_1.connect)();
        const result = yield conn.query("UPDATE posts SET title = ?, description = ?, image_url = ? WHERE id = ?", [title, description, image_url, id]);
        if (result[0].affectedRows === 0)
            return res.status(404).json({ message: "Post not found to update" });
        return res.json({ message: "Post updated whith id: " + id });
    });
}
exports.updatePost = updatePost;
//# sourceMappingURL=post.controller.js.map