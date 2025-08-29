import { mongoose } from "mongoose";

const borrowSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected", "returned", "overdue"],
  },
  dueDate: {
    type: Date,
  },
  requestDate: {
    type: Date,
  },

  borrowDate: {
    type: Date,
  },

  returnDate: {
    type: Date,
    default: null,
  },
});

export const Borrow = mongoose.model("Borrow", borrowSchema);
