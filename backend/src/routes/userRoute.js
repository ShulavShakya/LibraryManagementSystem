import express from "express";
import {
  createUser,
  getUserById,
  getUsers,
  deleteUser,
} from "../controller/userContoller.js";
import { authenticateToken, checkRole } from "../middleware/authMiddleware.js";

const Router = express.Router();

Router.post("/", [authenticateToken, checkRole("librarian")], createUser);
// Router.post("/", createUser);
Router.get("/", getUsers);
Router.get("/:id", getUserById);
Router.delete("/:id", deleteUser);

export default Router;
