import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';

export const jsonErrorHandler = (err: ErrorRequestHandler, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).send({ message: "an object of type json was expected", error: err });  
}