import { Request, Response } from "express";
import { connect } from "../../database";

//interfaces
import { Post } from "../../interfaces/Post";

export async function updatePost(req: Request, res: Response): Promise<Response> {
  const id = req.params.postId;
  const {title, description, image_url }: Post = req.body;
  const conn = await connect();  
  const result = await conn.query("UPDATE posts SET title = ?, description = ?, image_url = ? WHERE id = ?", [title, description, image_url, id]) as any;
  if(result[0].affectedRows === 0) 
    return res.status(404).json({message: "Post not found to update"});
  return res.json({message: "Post updated whith id: " + id});
}