import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import { sendEmail } from "../utils/sendEmail.js";

export const registerUser = async (req, res) => {
  try {
    const { password, ...otherFields } = req.body;
    const { email } = req.body;
    const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    const registeredUser = await User.findOne({ email });
    if (registeredUser) {
      return res.status(409).json({
        status: false,
        message: "User already exists",
      });
    }

    if (!password) {
      return res.status(400).json({
        status: false,
        message: "password not found",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      ...otherFields,
      password: hashedPassword,
    });

    if (numbers.some((digit) => user.name.includes(digit))) {
      return res.status(400).json({
        status: false,
        message: "Your name cannot include numbers",
      });
    }

    const savedUser = await user.save();

    sendEmail(
      user.email,
      "You've been registered",
      `Hello ${user.name},
       You have been successfully registered in our system.
       Your credentials are:
       email: ${user.email}
       password: ${req.body.password}`
    );

    res.status(200).json({
      status: true,
      message: "User registered successfully.",
      data: savedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      messaage: "Error occured during the process.",
      error: error.message,
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const user = await User.find();
    if (!user || user.length === 0) {
      return res.status(400).json({
        status: false,
        message: "No users found",
      });
    }
    res.status(200).json({
      status: true,
      message: "Users retrieved successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "An error occured while retrieving the users data.",
      error: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).json({
        status: false,
        message: `User with id ${req.params.id} not found`,
      });
    }
    res.status(200).json({
      status: true,
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: `Error occured while retrieving data of ${req.params.id}`,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(400).json({
        status: false,
        message: `No users with id ${req.params.id} found`,
      });
    }

    res.status(200).json({
      status: true,
      message: "User deleted successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: `Error occured while deleting the datat of user ${req.params.id}`,
      error: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = req.params;
    const updates = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!id) {
      return res.status(400).json({
        status: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error occured while updating",
      error: error.message,
    });
  }
};
