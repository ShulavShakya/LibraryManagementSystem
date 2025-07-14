import { User } from "../models/User.js";
import bcrypt from "bcryptjs";

export const createUser = async (req, res) => {
  try {
    const { password, ...otherFields } = req.body;

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
    const savedUser = await user.save();

    res.status(200).json({
      status: true,
      message: "User created successfully",
      data: savedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      messaage: "User couldn't be created",
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
