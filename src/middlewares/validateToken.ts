import { NextFunction, Request, Response } from 'express';
import jwt from "jsonwebtoken";

export const validateToken = async  (req: Request, res: Response, next: NextFunction ) => {
  const token = req.header('authorization');
  if(Boolean(token) && token?.startsWith('Bearer ')){
    const tokenValue = token.split(' ')[1];
    try {
      const decodedToken = await jwt.verify(tokenValue, process.env.JWT_SECRET || "") as { id: string };
      req.body.user_id = decodedToken.id;
      next();
    } catch (error) {
      res.status(401).json({message: "Access denied token unvalid"})
    }
  }else {
    res.status(401).json({message: "Access denied"})
  }
};