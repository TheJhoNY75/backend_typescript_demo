import { Request, Response, NextFunction  } from 'express';

interface Post {
    title: string;
    description: string;
}


export const validatePost = async (req: Request, res: Response, next: NextFunction) => {
  const { title, description }: Post = req.body;
  if(!title) return res.status(400).json({message: "Title is required"});
  if(!description) return res.status(400).json({message: "Description is required"});
  next();
};

export const validatePostId = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  if(!id) return res.status(400).json({message: "Id is required to " + req.method });
  next();
}