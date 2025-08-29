import { Borrow } from "../models/Borrow.js";
import { Book } from "../models/Book.js";
import { User } from "../models/User.js";
import { sendEmail } from "../utils/sendEmail.js";

// Borrow a book
export const requestBook = async (req, res) => {
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
      return res.status(400).json({
        status: false,
        message: "User not found",
      });
    }

    if (user.role === "librarian") {
      return res.status(400).json({
        status: false,
        message: "Librarian cannot borrow books",
      });
    }

    const activeBorrow = await Borrow.findOne({
      userId,
      bookId,
      status: { $in: ["pending", "approved"] },
    });

    if (activeBorrow) {
      return res.status(400).json({
        status: false,
        message: "You already requested/borrowed the book",
      });
    }

    const borrow = new Borrow({
      userId,
      bookId,
      status: "pending",
      requestDate: new Date(),
    });

    await borrow.save();
    sendEmail(
      user.email,
      "Book borrowed",
      `Hello ${user.name}, This email is send to you to confirm that you have borrowed the book "${book.title}"`
    );

    res.status(200).json({
      status: true,
      message: "Request submitted",
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

export const handleBorrowRequest = async (req, res) => {
  const { id } = req.params;
  const { action } = req.body; // action = "approve" | "reject"

  try {
    const borrow = await Borrow.findById(id).populate("userId bookId");

    if (!borrow || borrow.status !== "pending") {
      return res.status(400).json({ message: "Invalid request" });
    }

    // const book = await Book.findById(borrow.bookId);
    // if (!book) {
    //   return res.status(404).json({
    //     status: false,
    //     message: "Book not found",
    //   });
    // }

    const book = borrow.bookId;
    const user = borrow.userId;

    if (action === "reject") {
      borrow.status = "rejected";
      await borrow.save();
      return res.status(200).json({
        status: false,
        message: "Request rejected",
        data: borrow,
      });
    }

    // If approve
    if (action === "approve") {
      borrow.status = "approved";
      borrow.borrowDate = new Date();
      await borrow.save();
      if (book.available <= 0) {
        return res.status(400).json({
          status: false,
          message: "Book no longer available",
        });
      }
    }
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14);
    borrow.dueDate = dueDate;

    book.available -= 1;
    await book.save();
    await borrow.save();

    sendEmail(
      user.email,
      "Book Request Approved",
      `Your request for "${
        book.title
      }" has been approved. Due date: ${borrow.dueDate.toDateString()}.`
    );

    return res.status(200).json({
      status: true,
      message: "Request approved",
      data: borrow,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error handling request",
      error: error.message,
    });
  }
};

// Return a book
export const returnBook = async (req, res) => {
  try {
    const { id } = req.params;

    const borrow = await Borrow.findById(id).populate("bookId userId");
    if (!borrow || borrow.returnDate) {
      return res.status(400).json({
        status: false,
        message: "Invalid or already returned",
      });
    }

    const book = borrow.bookId;
    const user = borrow.userId;

    borrow.status = "returned";
    borrow.returnDate = new Date();

    // Check overdue
    if (borrow.returnedAt > borrow.dueDate) {
      const daysLate = Math.ceil(
        (borrow.returnedAt - borrow.dueDate) / (1000 * 60 * 60 * 24)
      );
      borrow.status = "overdue";
      borrow.fine = daysLate * 10;
      qhat;
    } else {
      borrow.status = "returned";
      borrow.fine = 0;
    }

    sendEmail(
      user.email,
      "Book returned",
      `Hello ${user.name},
      This email is sent to confirm that the borrowed book ${borrow.bookId.title} has been returned`
    );

    // Increase book availability
    book.available += 1;
    await book.save();
    await borrow.save();

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
    const borrowedBooks = await Borrow.find({ userId })
      .populate({
        path: "userId",
        select: "name",
      })
      .populate({ path: "bookId", select: "title author isbn" });
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
    if (req.params.id) {
      const userId = req.params.id;
      books = await Borrow.find({ userId }).populate("bookId");

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
      return res.status(200).json({
        status: true,
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
