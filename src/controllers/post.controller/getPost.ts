import { Request, Response } from "express";
import { connect } from "../../database";

/**
 * @swagger
 * /api/post/{id}:
 *  get:
 *    summary: Get a post by id
 *    security:
 *      - Authorization: []
 *    tags:
 *      - Post
 *    description: This enpoint get a post by id
 *    parameters:
 *      - $ref: '#/components/parameters/getId' 
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

export async function getPost(req: Request, res: Response): Promise<Response> {
  const id = req.params.postId;
  const conn = await connect();
  const [results] = await conn.query("SELECT * FROM posts WHERE id = ?", [id]) as any;
  if(results.length === 0) return res.status(404).json({message: "Post not found"});
  return res.json(results[0]);
}