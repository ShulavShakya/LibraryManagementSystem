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
  borrowDate: {
    type: Date,
    default: Date.now(),
  },
  returnDate: {
    type: Date,
    default: null,
  },
});

export const Borrow = mongoose.model("Borrow", borrowSchema);
