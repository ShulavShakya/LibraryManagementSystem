import express from "express";
import {
  addNewBook,
  getAllBooks,
  getBookById,
  updateBook,
  removeBook,
} from "../controller/bookController.js";

const router = express.Router();

router.post("/", [authenticateToken, checkRole("librarian")], addNewBook);
router.get("/", [authenticateToken, checkRole("librarian")], getAllBooks);
router.get("/:id", [authenticateToken, checkRole("librarian")], getBookById);
router.delete("/:id", [authenticateToken, checkRole("librarian")], removeBook);
router.put("/:id", [authenticateToken, checkRole("librarian")], updateBook);

export default router;
