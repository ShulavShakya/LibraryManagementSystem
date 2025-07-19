import { Book } from "../models/Book.js";

export const addNewBook = async (req, res) => {
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

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();

    if (!books || books.length === 0) {
      res.status(401).json({
        status: false,
        message: "No books found",
      });
    }
    res.status(200).json({
      status: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error occured while retrieving the book data",
      error: error.message,
    });
  }
};

export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(400).json({
        status: false,
        message: "Book not found",
      });
    }

    res.status(201).json({
      status: true,
      message: `Book with id ${req.params.id} retrieved successfully`,
      data: book,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Error occured",
      error: error.message,
    });
  }
};

export const removeBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(400).json({
        status: false,
        message: "Book not found",
      });
    }
    res.status(201).json({
      status: true,
      message: "Book removed successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Error occured",
      error: error.message,
    });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...remaining };

    const updatedBook = await Book.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updateBook) {
      return res.status(400).json({
        status: false,
        message: "Book not found",
      });
    }

    res.status(201).json({
      status: true,
      message: "Data updated successfully",
      data: updatedBook,
    });
  } catch (error) {
    res.status(500).json({
      staus: false,
      message: "Error occured",
      error: error.message,
    });
  }
};
