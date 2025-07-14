import express from "express";
import { login } from "../controller/authController.js";
import { limiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.post("/login", limiter, login);

export default router;
