import { Request, Response, NextFunction  } from 'express';

interface Post {
    title: string;
    description: string;
}


export const validatePost = async (req: Request, res: Response, next: NextFunction) => {
    try{
      const { title, description }: Post = req.body;
      if(!title) return res.status(400).json({message: "Title is required"});
      if(!description) return res.status(400).json({message: "Description is required"});
      next();
    } catch (error) {
      res.status(400).json({message: "Internal server error"});
    }
};

export const validatePostId = async (req: Request, res: Response, next: NextFunction) => {
    try{
      const { id } = req.params;
      if(!id) return res.status(400).json({message: "Id is required to " + req.method });
      next();
    } catch (error) {
      res.status(400).json({message: "id is required to" + req.method });
    }
}