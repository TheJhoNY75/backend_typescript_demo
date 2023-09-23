import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

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

const prisma = new PrismaClient();

export async function updatePost(req: Request, res: Response): Promise<Response> {
  const id = req.params.postId;
  const {title, description, image_url }: Post = req.body;
  try{
    const post = await prisma.posts.update({
      where: { id },
      data: {
        title,
        description,
        image_url,
      },
    });
    if(post){
      return res.json({message: "Post updated"});
    }
    return res.status(404).json({message: "Post not found to update"});
  }catch(err){
    console.log(err);
    return res.status(404).json({message: "Something went wrong"});
  }finally{
    await prisma.$disconnect();
  }
}