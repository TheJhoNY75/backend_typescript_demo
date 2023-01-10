import { Request, Response } from "express";
import { connect } from "../../database";

//options
import { sortByOptions, orderOptions, getOffset, getPages, getInfo } from "../../utils";
import { UserResponse } from '../../interfaces/User';

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

export async function getUsers(req: Request, res: Response): Promise<Response> {
  const conn = await connect();

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
  
  const totalItems = await conn.query("SELECT COUNT(*) as total FROM users")as any;
  
  const { pages } = getPages({totalItems, limmit}) ;
  //validate exist content
  if(page > pages ) 
    return res.status(404).json({message: "No more users"});

  const users = await conn.query(`SELECT * FROM users ORDER BY ${sortBy} ${order} LIMIT ?,?`, [Math.floor(offset), parseInt(limmit) ]) as any;

  const usersSerialized = users[0].map(({ 
    id, 
    email, 
    first_name, 
    last_name, 
    created_at, 
    updated_at 
  }: UserResponse) => ({
      id,
      email,
      first_name,
      last_name,
      created_at,
      updated_at,
    })); 
  
  return res.status(200).json({results: usersSerialized, info: getInfo({ page, limmit, totalItems, sortBy, order })});
}
