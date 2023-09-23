import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

//options
import { sortByOptions, orderOptions, getOffset, getPages, getInfo } from "../../utils";

/**
 * @swagger
 * /api/user:
 *  get:
 *    security:
 *      - Authorization: []
 *    tags:
 *      - User
 *    summary: Get all users
 *    description: Use to request all users
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
 *                    $ref: '#/components/schemas/UserResponse'
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

export async function getUsers(req: Request, res: Response): Promise<Response> {

  const limmit: any = req.query.limmit || 10;
  const page: any = req.query.page || 1;
  const sortBy: any =  req.query.sortby || "created_at";
  const order: any = req.query.order || "ASC";
  const { offset } = getOffset({page, limmit});
  
  //validate options
  if(!sortByOptions.includes(sortBy)) 
    return res.status(400).json({message: "Invalid sortby option", valid_options: sortByOptions});
  if(!orderOptions.includes(order)) 
    return res.status(400).json({message: "Invalid order option", valid_options: orderOptions});
  try{
    const totalItems = await prisma.users.count();
    const { pages } = getPages({totalItems, limmit}) ;
    //validate exist content
    if(page > pages ) 
      return res.status(404).json({message: "No more users"});
    const users = await prisma.users.findMany({
      orderBy: {
        [sortBy]: order
      },
      skip: Math.floor(offset),
      take: parseInt(limmit)
    });
    const filteredUsers = users.map(user => {
      const { password: _, ...rest } = user;
      return rest;
    });
    return res.status(200).json({results: filteredUsers, info: getInfo({ page, limmit, totalItems, sortBy, order })});
  }catch(err){
    console.log(err);
    return res.status(400).json({message: "Something went wrong"});
  }finally{
    await prisma.$disconnect();
  }
}
