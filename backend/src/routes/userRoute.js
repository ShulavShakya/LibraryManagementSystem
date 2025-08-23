import express from "express";
import {
  registerUser,
  getUserById,
  getUsers,
  deleteUser,
  updateUser,
} from "../controller/userContoller.js";
import { authenticateToken, checkRole } from "../middleware/authMiddleware.js";

const Router = express.Router();

Router.post("/register", registerUser);
Router.get("/get", [authenticateToken, checkRole("librarian")], getUsers);
Router.get(
  "/get/:id",
  [authenticateToken, checkRole("librarian")],
  getUserById
);
Router.delete(
  "/delete/:id",
  [authenticateToken, checkRole("librarian")],
  deleteUser
);
Router.put(
  "/update/:id",
  [authenticateToken, checkRole("librarian")],
  updateUser
);

export default Router;
