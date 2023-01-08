import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserLogin } from "../../interfaces/User";
import { connect } from "../../database";


export async function createAuth( req: Request, res: Response): Promise<Response> {
  const { email, password }: UserLogin = req.body;
  const conn = await connect();
  const [results] = (await conn.query("SELECT * FROM users WHERE email = ?", [ email ])) as any;
  //if user exists
  if (results.length > 0) {
    const user = results[0];
    const validPassword = await bcrypt.compare(password, user.password);
    //if password is valid
    if (validPassword) {
      const token = jwt.sign({ id: user.id, type: 'session' }, process.env.JWT_SECRET || "", { expiresIn: 216000000});
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
