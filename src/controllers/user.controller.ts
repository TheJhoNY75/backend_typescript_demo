import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User, UserLogin } from "../interfaces/User";
import { connect } from "../database";

export async function createUser( req: Request, res: Response): Promise<Response> {
  const { email, first_name, last_name, password }: User = req.body;
  const hashedPassword = await bcrypt.hash( password, process.env.BYCRYPT_SALT || 10);
  const conn = await connect();
  const [results] = (await conn.query("INSERT INTO users SET ?", [
    { email, first_name, last_name, password: hashedPassword },
  ])) as any;
  return res.json({ email, first_name, last_name, id: results.insertId });
}

export async function loginUser( req: Request, res: Response): Promise<Response> {
  const { email, password }: UserLogin = req.body;
  const conn = await connect();
  const [results] = (await conn.query("SELECT * FROM users WHERE email = ?", [ email ])) as any;
  //if user exists
  if (results.length > 0) {
    const user = results[0];
    const validPassword = await bcrypt.compare(password, user.password);
    //if password is valid
    if (validPassword) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "", { expiresIn: 216000000});
      

      return res.json({ message: "login success", token});
    //if password is invalid
    } else {
      return res.json({ message: "invalid password" });
    }
    //if user does not exist
  } else {
    return res.json({ message: "user not found" });
  }
}
