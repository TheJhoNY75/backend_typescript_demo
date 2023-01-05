import { Request, Response } from "express";

export function indexWelcome(_req: Request, res:  Response):  Response {
  return res.json({ message: "Welcome to my API" });
}