import express from "express";
import { createBorrower } from "../controller/borrowController.js";

const router = express.Router();

router.post("/", createBorrower);

export default router;
