import { Request, Response } from "express";
import { connect } from "../database";
import { v4 as uuid } from 'uuid';


export interface Test {
  name: string;
  description: string;
}

export async function singup(req: Request, res:  Response): Promise<Response> {
  const newTest: Test = req.body;
  const id = uuid();
  const conn = await connect();
  await conn.query("INSERT INTO test SET ?", [{id, ...newTest}]);
  const [results] = await conn.query("SELECT * FROM test WHERE id = ?", [id]) as any;
  return res.json(results[0]);
}