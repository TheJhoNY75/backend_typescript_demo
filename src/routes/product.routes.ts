import { Router } from "express";
import { getProducts } from "../controllers/product.controller";
import { validateToken } from '../validate/index';

const router = Router();

router.get("/", validateToken , getProducts)

export default router;