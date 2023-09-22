import { Router } from "express";
import { getWhoami } from "../controllers/whoami.controller";

const router = Router();

router.get("/", getWhoami);

export default router;