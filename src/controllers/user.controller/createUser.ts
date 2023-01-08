import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { User } from "../../interfaces/User";
import { connect } from "../../database";

export async function createUser( req: Request, res: Response): Promise<Response> {
  const { email, first_name, last_name, password }: User = req.body;  
  const id = uuid();
  const hashedPassword = await bcrypt.hash( password, 10);
  const conn = await connect();
  await conn.query("INSERT INTO users SET ?", [
    { id, email, first_name, last_name, password: hashedPassword, role_id: 1 },
  ]);
  return res.json({ id, email, first_name, last_name });
}
