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
// app.set("trust proxy", 1);
const port = process.env.PORT || 5050;
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin) return callback(null, true); // allow requests like Postman/cURL

//     const allowedOrigins = [
//       "http://localhost:5050", // local dev
//       "https://the-whimsical.vercel.app", // production
//     ];

//     // Allow any vercel preview subdomain for this project
//     const vercelPreviewRegex =
//       /^https:\/\/the-whimsical-[\w-]+-shulavshakyas-projects\.vercel\.app$/;

//     if (allowedOrigins.includes(origin) || vercelPreviewRegex.test(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
// };

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:8081",
      "https://the-whimsical.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//Routes
app.use("/api", routes);

//SeedAdmin
seedAdmin();

//app-run
dbConnection().then(() => {
  app.listen(port, () => {
    console.log(`Server is listening at port: http://localhost:${port}`);
  });
});
