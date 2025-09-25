import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { User } from "../../interfaces/User";

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

const prisma = new PrismaClient();

export async function createUser( req: Request, res: Response) {
  const { email, first_name, last_name, password }: User = req.body;  
  try{
    const newProfile = await prisma.profiles.create({
      data: {},
    });
    const hashedPassword = await bcrypt.hash( password, SALT_VALUE);
    const newUser: User = await prisma.users.create({
      data: {
        email,
        first_name,
        last_name,
        password: hashedPassword,
        profile_id: newProfile.id,
      },
    });
    const { password: _, ...user } = newUser;
    return res.json(user);
  }catch(err: any){
    console.log(err);
    if(err.code === "ER_DUP_ENTRY")
      return res.json({ message: "Email already exists" });
    return res.json({ message: "Something went wrong" });
  }finally{
    await prisma.$disconnect();
  }
}
