import Book from "../models/Book.js";

export const createBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    const savedBook = await book.save();

    res.status(200).json({
      status: true,
      messaage: "Book added successfully",
      data: savedBook,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      messge: "Error occured while adding the book",
      error: error.message,
    });
  }
};
