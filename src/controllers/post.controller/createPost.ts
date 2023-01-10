import { Request, Response } from "express";
import { v4 as uuid } from 'uuid';
import { connect } from "../../database";

//interfaces
import { Post } from "../../interfaces/Post";

/**
 * @swagger
 * /api/post:
 *  post:
 *    summary: Create a new post
 *    security:
 *      - Authorization: []
 *    tags:
 *      - Post
 *    description: This enpoint create a new post
 *    requestBody:
 *      required: 
 *        - title
 *        - description
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/PostRequest'
 *    responses:
 *      200:
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PostResponse'
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Message'
 */

export async function createPost(req: Request, res: Response): Promise<Response> {
  const { title, description, image_url, user_id }: Post = req.body;
  const id = uuid();
  const date = new Date();
  const newPost: Post = {
    id,
    title, 
    description, 
    image_url,
    user_id
  }
  const conn = await connect();
  
  try{
    await conn.query("INSERT INTO posts SET ?", [newPost]);
    return res.json({...newPost, created_at: date, updated_at: date});
  }catch(err){
    return res.json({
      message: "User id is not valid",
    })
  }
}
