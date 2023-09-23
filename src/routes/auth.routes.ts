import { Router } from "express";
import { createAuth } from "../controllers/auth.controller";
import { validateAuth } from "../middlewares";

const router = Router();

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: The auth API
 */

router.post("/", validateAuth, createAuth);

export default router;