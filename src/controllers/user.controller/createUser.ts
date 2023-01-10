import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { User } from "../../interfaces/User";
import { connect } from "../../database";

const SaltEnv = parseInt(process.env.BYCRYPT_SALT || '');

const SALT_VALUE = Number.isInteger(SaltEnv) ? SaltEnv : 10;

/**
 * @swagger
 *  /api/user:
 *    post:
 *      summary: Create a new user
 *      tags:
 *        - User
 *      description: This enpoint create a new user
 *      requestBody:
 *        required:
 *          - email
 *          - first_name
 *          - last_name
 *          - password
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserRequest'
 *        responses:
 *          200:
 *            description: A successful response
 *            content:
 *              application/json:
 *                schema:
 *                 $ref: '#/components/schemas/UserResponse'
 *          400:
 *            description: Bad request
 *            content:
 *              application/json:
 *                schema:
 *                 $ref: '#/components/schemas/Message'
 */

export async function createUser( req: Request, res: Response) {
  const { email, first_name, last_name, password }: User = req.body;  
  const id = uuid();
  const date = new Date();
  const hashedPassword = await bcrypt.hash( password, SALT_VALUE);
  const conn = await connect();
  try{
    await conn.query("INSERT INTO users SET ?", [
      { id, email, first_name, last_name, password: hashedPassword, role_id: 1 },
    ]);
    return res.json({ id, email, first_name, last_name, created_at: date, updated_at: date });
  }catch(err: any){
    console.log(err);
    if(err.code === "ER_DUP_ENTRY")
      return res.json({ message: "Email already exists" });
    return res.json({ message: "Something went wrong" });
  }
}
