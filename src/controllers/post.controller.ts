import { Request, Response } from "express";
import { connect } from "../database";

//interfaces
import { Post } from "../interfaces/Post";


export async function getPosts(_req: Request, res: Response): Promise<Response> {
  const conn = await connect();
  const posts = await conn.query("SELECT * FROM posts");
  return res.json(posts[0]);
}

export async function createPost(req: Request, res: Response): Promise<Response> {
  const newPost: Post = req.body;
  const conn = await connect();
  const [results] = await conn.query("INSERT INTO posts SET ?", [newPost]) as any;
  return res.json({id: results.insertId, ...newPost});
}

export async function getPost(req: Request, res: Response): Promise<Response> {
  const id = req.params.postId;
  const conn = await connect();
  const [results] = await conn.query("SELECT * FROM posts WHERE id = ?", [id]) as any;
  return res.json(results[0]);
}

export async function deletePost(req: Request, res: Response): Promise<Response> {
  const id = req.params.postId;
  const conn = await connect();
  await conn.query("DELETE FROM posts WHERE id = ?", [id]);
  return res.json({message: "Post deleted"});
}

export async function updatePost(req: Request, res: Response): Promise<Response> {
  const id = req.params.postId;
  const updatePost: Post = req.body;
  const conn = await connect();
  await conn.query("UPDATE posts SET ? WHERE id = ?", [updatePost, id]);
  return res.json({message: "Post updated"});
}