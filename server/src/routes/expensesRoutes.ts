import { Router } from "express";
import { getExpensesBycatetgory } from "../controllers/expenseController";
const router = Router();
router.get("/", getExpensesBycatetgory); /// http://localhost:8000/expenses

export default router;