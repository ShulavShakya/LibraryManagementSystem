import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { createUser } from "./controller/userContoller.js";

dotenv.config();

const app = express();
const port = 5050;
const MONGODB_URL = process.env.MONGODB_URI;

const dbConnection = mongoose.connect(MONGODB_URL);
dbConnection
  .then(() => {
    console.log("Connected to database successfully");
  })
  .catch((error) => {
    console.log("Could not connect to database:", error);
  });

app.use(express.json());

app.get("/", (req, res) => {
  res.send("This is supposed to be my lbms");
});

app.post("/api/create", createUser);

app.listen(port, () => {
  console.log(`Server is listening at port: http://localhost:${port}`);
});
