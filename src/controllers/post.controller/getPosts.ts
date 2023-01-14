import { Request, Response } from "express";
import { connect } from "../../database";

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

export async function getPosts(req: Request, res: Response): Promise<Response> {
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
  
  const totalItems = await conn.query("SELECT COUNT(*) as total FROM posts")as any;
  
  const { pages } = getPages({totalItems, limmit}) ;
  //validate exist content
  if(page > pages ) 
    return res.status(404).json({message: "No more posts"});

  const posts = await conn.query(`SELECT * FROM posts ORDER BY ${sortBy} ${order} LIMIT ?,?`, [Math.floor(offset), parseInt(limmit)]);
  
  return res.status(200).json({results: posts[0], info: getInfo({ page, limmit, totalItems, sortBy, order })});
}
