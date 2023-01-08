import { Request, Response } from "express";
import { connect } from "../../database";

export async function getPost(req: Request, res: Response): Promise<Response> {
  const id = req.params.postId;
  const conn = await connect();
  const [results] = await conn.query("SELECT * FROM posts WHERE id = ?", [id]) as any;
  if(results.length === 0) return res.status(404).json({message: "Post not found"});
  return res.json(results[0]);
}