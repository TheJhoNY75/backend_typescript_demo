import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

//options
import { sortByOptions, orderOptions, getOffset, getPages, getInfo } from "../../utils";

/**
 * @swagger
 * /api/post:
 *  get:
 *    security:
 *      - Authorization: []
 *    tags:
 *      - Post
 *    summary: Get all posts
 *    description: Use to request all posts
 *    responses:
 *      200:
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                results:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/PostResponse'
 *                info:
 *                  $ref: '#/components/schemas/Paginate'
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Message'
 */

const prisma = new PrismaClient();

export async function getPosts(req: Request, res: Response): Promise<Response> {
  const limmit: any = req.query.limmit || 10;
  const page: any = req.query.page || 1;
  const sortBy: any =  req.query.sortby || "created_at";
  const order: any = req.query.order || "asc";
  const { offset } = getOffset({page, limmit});
  
  //validate options
  if(!sortByOptions.includes(sortBy)) 
    return res.status(400).json({message: "Invalid sortby option", valid_options: sortByOptions});
  if(!orderOptions.includes(order)) 
    return res.status(400).json({message: "Invalid order option", valid_options: orderOptions});
  try{
    const totalItems = await prisma.posts.count();
    const { pages } = getPages({totalItems, limmit}) ;
    //validate exist content
    if(page > pages ) 
      return res.status(404).json({message: "No more posts"});
    const posts = await prisma.posts.findMany({
      orderBy: {
        [sortBy]: order
      },
      skip: Math.floor(offset),
      take: parseInt(limmit),
    });    
    return res.status(200).json({results: posts, info: getInfo({ page, limmit, totalItems, sortBy, order })});
  }catch(err){
    console.log(err);
    return res.status(400).json({message: "Something went wrong"});
  }finally{
    await prisma.$disconnect();
  }
}
