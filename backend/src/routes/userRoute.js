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

Router.post("/", registerUser);
Router.get("/", [authenticateToken, checkRole("librarian")], getUsers);
Router.get("/:id", [authenticateToken, checkRole("librarian")], getUserById);
Router.delete("/:id", [authenticateToken, checkRole("librarian")], deleteUser);
Router.put("/:id", [authenticateToken, checkRole("librarian")], updateUser);

export default Router;
