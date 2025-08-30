import express from "express";
import {
  adminView,
  handleBorrowRequest,
  requestBook,
  returnBook,
  viewBorrowedBooks,
} from "../controller/borrowController.js";
import { authenticateToken, checkRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/request", authenticateToken, requestBook);
router.put("/:id/handle", authenticateToken, handleBorrowRequest);
router.post("/:id/return", authenticateToken, returnBook);
router.get("/view/user/:id", authenticateToken, viewBorrowedBooks);

router.get(
  "/admin/get",
  [authenticateToken, checkRole("librarian")],
  adminView
);
router.get(
  "/admin/get/:userId",
  [authenticateToken, checkRole("librarian")],
  adminView
);

export default router;
