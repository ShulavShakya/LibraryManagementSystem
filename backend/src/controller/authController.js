import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/User.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        status: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        status: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.KEY,
      { expiresIn: "1hr" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 36000000),
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({
      status: true,
      message: "Login successfull",
      data: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Login unsuccessfull",
      error: error.message,
    });
  }
};
