import User from "../models/User.js";

export const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
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
