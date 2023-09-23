import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

/**
 * @swagger
 * /api/whoami:
 *  get:
 *    summary: Get validation token
 *    security:
 *      - Authorization: []
 *    tags:
 *      - Whoami
 *    description: This route is used to get validation token
 *    responses:
 *      200:
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PostResponse'
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Message'
 */

const prisma = new PrismaClient();

export async function getWhoami(req: Request, res: Response): Promise<Response> {
  const token = req.headers.authorization as string;
  const tokenValue = token.split(' ')[1];
  try {
    const dataToken: any = await jwt.verify(tokenValue, process.env.JWT_SECRET || "")
    const user = await prisma.users.findUnique({
      where: { id: dataToken.id },
    });
    if (user) {
      return res.json({ id: user.id, message: 'valid token' });
    } else {
      return res.status(401).json({ message: 'Invalid token' });
    }
  } catch (err: any) {
    console.log(err);
    return res.status(401).json({ message: 'Something went wrong' });
  } finally {
    await prisma.$disconnect();
  }
}