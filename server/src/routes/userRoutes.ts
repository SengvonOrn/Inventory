import { Router } from "express";
import { getUser } from "../controllers/userController";
const router = Router();
router.get("/", getUser); /// http://localhost:8000/users

export default router;
