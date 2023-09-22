import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';

interface IError extends ErrorRequestHandler {
  type: string;
  body: string;
}

export const jsonErrorHandler = (err: IError, _req: Request, res: Response, _next: NextFunction) => {
  return res.status(500).send({ message: "an object of type json was expected", error: err }); 
}