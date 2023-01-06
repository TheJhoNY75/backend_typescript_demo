import { Router } from "express";
import { singup } from "../controllers/auth.controller";

const router = Router();

router.post("/", singup);

export default router;