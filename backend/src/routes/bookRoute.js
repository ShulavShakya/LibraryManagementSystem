import express from "express";
import {
  addNewBook,
  getAllBooks,
  getBookById,
  updateBook,
  removeBook,
} from "../controller/bookController.js";
import { authenticateToken, checkRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", [authenticateToken, checkRole("librarian")], addNewBook);
router.get("/get", getAllBooks);
router.get("/get/:id", [authenticateToken], getBookById);
router.delete(
  "/delete/:id",
  [authenticateToken, checkRole("librarian")],
  removeBook
);
router.put(
  "/update/:id",
  [authenticateToken, checkRole("librarian")],
  updateBook
);

export default router;
