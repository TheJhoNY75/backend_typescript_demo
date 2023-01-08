import { Router } from "express";
import { createAuth } from "../controllers/auth.controller";

const router = Router();

router.post("/", createAuth);

export default router;