import { Request, Response } from "express";
import { connect } from "../../database";

//options
import { sortByOptions, orderOptions, getOffset, getPages, getInfo } from "../../utils";

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
  
  const totalPosts = await conn.query("SELECT COUNT(*) as total FROM posts")as any;
  
  const { pages } = getPages({totalPosts, limmit}) ;
  //validate exist content
  if(page > pages ) 
    return res.status(404).json({message: "No more posts"});

  const posts = await conn.query(`SELECT * FROM posts ORDER BY ${sortBy} ${order} LIMIT ?,?`, [Math.floor(offset), Math.floor(limmit) ]);
  
  return res.status(200).json({results: posts[0], info: getInfo({ page, limmit, totalPosts, sortBy, order })});
}
