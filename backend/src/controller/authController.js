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

    user.status = "active";
    await user.save();

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.KEY,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      // sameSite: "None",
      expires: new Date(Date.now() + 3600000),
      secure: process.env.NODE_ENV === "production",
    });

    const { password: pass, ...remData } = user._doc;
    return res.status(200).json({
      status: true,
      message: "Login successfull",
      data: token,
      user: remData,
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
