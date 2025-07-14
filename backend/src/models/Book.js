import { mongoose } from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  isbn: {
    type: String,
    unique: true,
    required: true,
  },
  quantity: {
    type: Number,
    default: 0,
  },
  available: {
    type: Number,
    default: 0,
  },
});

const Book = mongoose.model("Book", bookSchema);
export default Book;
