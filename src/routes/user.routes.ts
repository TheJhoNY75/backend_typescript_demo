import { Router } from "express";
import { validateToken } from "../middlewares";
import { createUser, getUsers } from "../controllers/user.controller";

const router = Router();

/**
 * @swagger
 *  tags:
 *    name: User
 *    description: The user API
 */

router.post("/", createUser)

router.get("/", validateToken, getUsers)

export default router;