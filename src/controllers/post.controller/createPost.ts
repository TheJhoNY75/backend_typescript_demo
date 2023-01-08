import { Request, Response } from "express";
import { v4 as uuid } from 'uuid';
import { connect } from "../../database";

//interfaces
import { Post } from "../../interfaces/Post";

export async function createPost(req: Request, res: Response): Promise<Response> {
  const { title, description, image_url, user_id }: Post = req.body;
  const id = uuid();
  const newPost: Post = {
    id,
    title, 
    description, 
    image_url,
    user_id,
  }
  const conn = await connect();
  try{
    await conn.query("INSERT INTO posts SET ?", [newPost]);
    return res.json(newPost);
  }catch(err){
    return res.json({
      message: "User id is not valid",
    })
  }
}
