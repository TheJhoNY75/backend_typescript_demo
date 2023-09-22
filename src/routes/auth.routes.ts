import { Router } from "express";
import { createAuth } from "../controllers/auth.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: The auth API
 */

router.post("/", createAuth);

export default router;