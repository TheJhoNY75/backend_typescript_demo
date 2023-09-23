import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

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

const prisma = new PrismaClient();

export async function createPost(req: Request, res: Response): Promise<Response> {
  const { title, description, image_url, user_id }: Post = req.body;
  try{
  const newPost = await prisma.posts.create({
    data: {
      title, 
      description, 
      image_url,
      user_id,
    }
  });  
    return res.json(newPost);
  }catch(err){
    console.log(err);
    return res.json({
      message: "User id is not valid",
    })
  }finally{
    await prisma.$disconnect();
  }
}
