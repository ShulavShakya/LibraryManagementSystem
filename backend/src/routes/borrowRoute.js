import express from "express";
import {
  adminView,
  borrowBook,
  returnBook,
  viewBorrowedBooks,
} from "../controller/borrowController.js";
import { authenticateToken, checkRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/borrow", authenticateToken, borrowBook);
router.post("/return", authenticateToken, returnBook);
router.get("/view", authenticateToken, viewBorrowedBooks);

router.get("/admin", [authenticateToken, checkRole("librarian")], adminView);
router.get(
  "/admin/:id",
  [authenticateToken, checkRole("librarian")],
  adminView
);

export default router;
