import { Request, Response } from "express";
import { connect } from "../../database";

export async function deletePost(req: Request, res: Response): Promise<Response> {
  const id = req.params.postId;
  const conn = await connect();
  const results = await conn.query("DELETE FROM posts WHERE id = ?", [id]) as any;
  
  if(results[0].affectedRows === 0) return res.status(404).json({message: "Post not found to delete"});

  return res.json({message: "Post deleted"});
}