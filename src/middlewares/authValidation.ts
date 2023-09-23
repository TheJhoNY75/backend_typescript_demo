import { Request, Response, NextFunction  } from 'express';
import { UserLogin } from '../interfaces/User';

export const validateAuth = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password }: UserLogin = req.body;  
  if(!email) 
    return res.status(400).json({message: "Email is required"});
  if(!password) 
    return res.status(400).json({message: "Password is required"});
  next();
};