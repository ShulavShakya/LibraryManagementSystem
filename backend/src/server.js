//imports
import express from "express";
import dotenv from "dotenv";
import routes from "./routes/indexRoute.js";
import dbConnection from "./config/dbconfig.js";
import cookieParser from "cookie-parser";
import { seedAdmin } from "./config/seedAdmin.js";
import cors from "cors";

//configuring dotenv
dotenv.config();

//declaration of apps and port
const app = express();
app.set("trust proxy", 1);
const port = process.env.PORT || 5050;
//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://the-whimsical.vercel.app/",
    credentials: true,
  })
);

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
