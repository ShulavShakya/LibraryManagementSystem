import express from "express";
import userRoute from "./userRoute.js";
import bookRoute from "./bookRoute.js";
import borrowRoute from "./borrowRoute.js";
import authRoute from "./authRoute.js";

const router = express.Router();

router.use("/user", userRoute);
router.use("/book", bookRoute);
router.use("/borrower", borrowRoute);
router.use("/auth", authRoute);

export default router;
