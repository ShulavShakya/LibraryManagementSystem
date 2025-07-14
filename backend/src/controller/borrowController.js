import { Borrow } from "../models/Borrow.js";

export const createBorrower = async (req, res) => {
  try {
    const borrower = new Borrow(req.body).populate("userId").populate("isbn");
    const savedBorrower = await borrower.save();

    res.status(200).json({
      status: true,
      message: "borrower added successfully",
      data: savedBorrower,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error occured while adding borrower details",
      error: error.message,
    });
  }
};
