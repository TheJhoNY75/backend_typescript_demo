import { Request, Response } from "express";
import { v4 as uuid } from 'uuid';
import { connect } from "../database";

//interfaces
import { Post } from "../interfaces/Post";

const sortByOptions: Array<string>  = ["title", "description", "created_at", "updated_at"]; 
const orderOptions: Array<string> = ["ASC", "DESC"];


export async function getPosts(req: Request, res: Response): Promise<Response> {
  const conn = await connect();

  const limmit: any = req.query.limmit || 10;
  const page: any = req.query.page || 1;
  const sortBy: any =  req.query.sortby || "created_at";
  const order: any = req.query.order || "ASC";
  const offset = (Math.floor(page) - 1) * Math.floor(limmit);
  const nextPageUrl = `/api/post?page=${Math.floor(page) + 1}&limmit=${limmit}&sortBy=${sortBy}&order=${order}`;
  const prevPageUrl = `/api/post?page=${Math.floor(page) - 1}&limmit=${limmit}&sortBy=${sortBy}&order=${order}`;
  
  if(!sortByOptions.includes(sortBy)) return res.status(400).json({message: "Invalid sortby option", valid_options: sortByOptions});
  if(!orderOptions.includes(order)) return res.status(400).json({message: "Invalid order option", valid_options: orderOptions});
  
  const totalPosts = await conn.query("SELECT COUNT(*) as total FROM posts")as any;
  
  const pages = Math.ceil(totalPosts[0][0].total / limmit) !== 0 ? Math.ceil(totalPosts[0][0].total / limmit) : 1 ;
  const next = page < pages ? nextPageUrl : null;
  const prev = page > 1 ? prevPageUrl : null;
  
  if(page > pages ) return res.status(404).json({message: "No more posts"});

  const posts = await conn.query(`SELECT * FROM posts ORDER BY ${sortBy} ${order} LIMIT ?,?`, [Math.floor(offset), Math.floor(limmit) ]);

  return res.json({results: posts[0], info:{ page: Math.floor(page), count: totalPosts[0][0].total ,next, prev, pages}});
}



export async function createPost(req: Request, res: Response): Promise<Response> {
  const newPost: Post = req.body;
  const id = uuid();
  const conn = await connect();
  await conn.query("INSERT INTO posts SET ?", [{id, ...newPost}]);
  return res.json({id, ...newPost});
}

export async function getPost(req: Request, res: Response): Promise<Response> {
  const id = req.params.postId;
  const conn = await connect();
  const [results] = await conn.query("SELECT * FROM posts WHERE id = ?", [id]) as any;
  if(results.length === 0) return res.status(404).json({message: "Post not found"});
  return res.json(results[0]);
}

export async function deletePost(req: Request, res: Response): Promise<Response> {
  const id = req.params.postId;
  const conn = await connect();
  const results = await conn.query("DELETE FROM posts WHERE id = ?", [id]) as any;
  
  if(results[0].affectedRows === 0) return res.status(404).json({message: "Post not found to delete"});

  return res.json({message: "Post deleted"});
}

export async function updatePost(req: Request, res: Response): Promise<Response> {
  const id = req.params.postId;
  const {title, description, image_url }: Post = req.body;
  const conn = await connect();  
  const result = await conn.query("UPDATE posts SET title = ?, description = ?, image_url = ? WHERE id = ?", [title, description, image_url, id]) as any;
  if(result[0].affectedRows === 0) return res.status(404).json({message: "Post not found to update"});
  return res.json({message: "Post updated whith id: " + id});
}