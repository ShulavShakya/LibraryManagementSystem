import { Borrow } from "../models/Borrow.js";
import { Book } from "../models/Book.js";
import { User } from "../models/User.js";
import { sendEmail } from "../utils/sendEmail.js";

// Borrow a book
export const borrowBook = async (req, res) => {
  try {
    const userId = req.user._id;
    const { bookId } = req.body;

    const book = await Book.findById(bookId);
    if (!book || book.available < 1) {
      return res.status(400).json({
        status: false,
        message: "No available copies",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      res.status(400).json({
        status: false,
        message: "User not found",
      });
    }

    // Create borrow record
    const borrow = new Borrow({ userId, bookId });
    await borrow.save();
    sendEmail(
      user.email,
      "Book borrowed",
      `Hello ${user.name}, This email is send to you to confirm that you have borrowed the book "${book.title}"`
    );

    // Decrease available count
    book.available -= 1;
    await book.save();

    res.status(201).json({
      status: true,
      message: "Book borrowed",
      data: borrow,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Server error",
      error: err.message,
    });
  }
};

// Return a book
export const returnBook = async (req, res) => {
  try {
    const { borrowId } = req.body;

    const borrow = await Borrow.findById(borrowId).populate("bookId userId");
    if (!borrow || borrow.returnDate) {
      return res.status(400).json({
        status: false,
        message: "Invalid or already returned",
      });
    }

    borrow.returnDate = new Date();
    await borrow.save();
    sendEmail(
      borrow.userId.email,
      "Book returned",
      `Hello ${borrow.userId.name},
      This email is sent to confirm that the borrowed book ${borrow.bookId.title} has been returned`
    );

    // Increase book availability
    const book = await Book.findById(borrow.bookId._id);
    book.available += 1;
    await book.save();

    res.status(200).json({
      status: true,
      message: "Book returned",
      data: borrow,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Server error",
      error: err.message,
    });
  }
};

export const viewBorrowedBooks = async (req, res) => {
  try {
    const userId = req.user._id;
    const borrowedBooks = await Borrow.find({ userId }).populate(
      "userId bookId"
    );
    if (!borrowedBooks || borrowedBooks.length === 0) {
      return res.status(400).json({
        status: false,
        message: "No books have been borrowed yet",
      });
    }
    res.status(200).json({
      status: true,
      message: "Borrowed books retrieved successfully",
      data: borrowedBooks,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error fetching the data",
      error: error.message,
    });
  }
};

export const adminView = async (req, res) => {
  try {
    let books;
    if (req.params.userId) {
      const userId = req.params.userId;
      books = await Borrow.find({ userId }).populate("bookId");
      if (!books || books.length === 0) {
        return res.status(400).json({
          status: false,
          messaage: "No books have been borrowed",
        });
      }
      return res.status(200).json({
        status: true,
        message: `Books borrowed by ${userId} are as follow`,
        data: books,
      });
    }
    books = await Borrow.find()
      .populate("bookId")
      .populate([{ path: "userId", select: "name" }]);
    if (!books || books.length === 0) {
      return res.status(400).json({
        status: false,
        message: "No books have been borrowed",
      });
    }
    res.status(200).json({
      status: true,
      message: "Borrowed books are as followed",
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "An unexpected error occured",
      error: error.message,
    });
  }
};
