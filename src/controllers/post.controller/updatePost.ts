import { Request, Response } from "express";
import { connect } from "../../database";

//interfaces
import { Post } from "../../interfaces/Post";

/**
 * @swagger
 * /api/post/{id}:
 *  put:
 *    summary: Update a post by id
 *    security:
 *      - Authorization: []
 *    tags:
 *      - Post
 *    description: This enpoint update a post by id
 *    parameters:
 *      - $ref: '#/components/parameters/getId'
 *    requestBody:
 *      required: 
 *        - title
 *        - description
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/PostRequestUpdate'
 *    responses:
 *      200:
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Message'
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Message'
 */


export async function updatePost(req: Request, res: Response): Promise<Response> {
  const id = req.params.postId;
  const {title, description, image_url }: Post = req.body;
  const conn = await connect();  
  const result = await conn.query("UPDATE posts SET title = ?, description = ?, image_url = ? WHERE id = ?", [title, description, image_url, id]) as any;
  if(result[0].affectedRows === 0) 
    return res.status(404).json({message: "Post not found to update"});
  return res.json({message: "Post updated whith id: " + id});
}