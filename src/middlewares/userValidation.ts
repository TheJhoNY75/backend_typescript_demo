import { Request, Response, NextFunction  } from 'express';
import { User } from '../interfaces/User';

export const validateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, first_name, last_name, password }: User = req.body;  
  if(!email) 
    return res.status(400).json({message: "Email is required"});
  if(!first_name) 
    return res.status(400).json({message: "First name is required"});
  if(!last_name) 
    return res.status(400).json({message: "Last name is required"});
  if(!password) 
    return res.status(400).json({message: "Password is required"});
  next();
};

export const validateUserId = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  if(!id) return res.status(400).json({message: "Id is required to " + req.method });
  next();
}