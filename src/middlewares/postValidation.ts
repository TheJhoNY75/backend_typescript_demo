import { Request, Response, NextFunction  } from 'express';

interface Post {
    title: string;
    description: string;
    user_id: string;
}

export const validatePost = async (req: Request, res: Response, next: NextFunction) => {
  const { title, description, user_id }: Post = req.body;  
  if(!title) 
    return res.status(400).json({message: "Title is required"});
  if(!description) 
    return res.status(400).json({message: "Description is required"});
  if(!user_id && req.method === "POST")
    return res.status(400).json({message: "User id is required"});
  next();
};

export const validatePostId = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  if(!id) return res.status(400).json({message: "Id is required to " + req.method });
  next();
}