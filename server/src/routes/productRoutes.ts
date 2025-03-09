import { Router } from "express";
import {  createProducts ,getProducts } from "../controllers/productController";
const router = Router();
router.get("/", getProducts); /// http://localhost:8000/dashboard/metrics
router.post("/", createProducts);

export default router;
