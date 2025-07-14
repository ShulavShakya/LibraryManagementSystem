//imports
import express from "express";
import dotenv from "dotenv";
import routes from "./routes/indexRoute.js";
import dbConnection from "./config/dbconfig.js";
import cookieParser from "cookie-parser";
import { seedAdmin } from "./config/seedAdmin.js";

//configuring dotenv
dotenv.config();

//declaration of apps and port
const app = express();
const port = process.env.PORT;

//middlewares
app.use(express.json());
app.use(cookieParser());

//Route
app.use("/api", routes);

//SeedAdmin
seedAdmin();

//app-run
dbConnection().then(() => {
  app.listen(port, () => {
    console.log(`Server is listening at port: http://localhost:${port}`);
  });
});
