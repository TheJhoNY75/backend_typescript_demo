import { Request, Response } from "express";
import { connect } from "../../database";
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

export async function getWhoami(req: Request, res: Response): Promise<Response> {
  const token = req.headers.authorization as string;
  const tokenValue = token.split(' ')[1];
  const dataToken: any = await jwt.verify(tokenValue, process.env.JWT_SECRET || "")
  const conn = await connect();
  const [results] = await conn.query("SELECT * FROM users WHERE id = ?", [dataToken.id]) as any;
  if(results.length === 0) return res.status(404).json({message: "Unvalid token"});
  return res.json({ id: dataToken.id, message: "valid token"});
}