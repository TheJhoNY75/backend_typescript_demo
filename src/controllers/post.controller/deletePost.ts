import { Request, Response } from "express";
import { connect } from "../../database";

/**
 * @swagger
 * /api/post/{id}:
 *  delete:
 *    summary: Delete a post by id
 *    security:
 *      - Authorization: []
 *    tags:
 *      - Post
 *    description: This enpoint delete a post by id
 *    parameters:
 *      - $ref: '#/components/parameters/getId'
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

export async function deletePost(req: Request, res: Response): Promise<Response> {
  const id = req.params.postId;
  const conn = await connect();
  const results = await conn.query("DELETE FROM posts WHERE id = ?", [id]) as any;
  
  if(results[0].affectedRows === 0) return res.status(404).json({message: "Post not found to delete"});

  return res.json({message: "Post deleted"});
}