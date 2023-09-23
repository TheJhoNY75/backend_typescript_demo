import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

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

const prisma = new PrismaClient();

export async function getPost(req: Request, res: Response): Promise<Response> {
  const id = req.params.postId;
  try{
    const post = await prisma.posts.findUnique({
      where: { id },
    });
    if(post){
      return res.json(post);
    }else{
      return res.status(404).json({message: "Post not found"});
    }
  }catch(err){
    console.log(err);
    return res.status(404).json({message: "Something went wrong"});
  }finally{
    await prisma.$disconnect();
  }
}