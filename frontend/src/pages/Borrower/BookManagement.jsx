import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { privateAPI, publicAPI } from "../../utils/config";
import GeneralNavBar from "../../components/Borrower/GeneralNavBar";
import Footer from "../../components/Borrower/Footer";

const BookManagement = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  // 1️⃣ Check if user is logged in
  useEffect(() => {
    const user = Cookies.get("user");
    if (!user) {
      toast.error("Please login to view books");
      navigate("/login");
    } else {
      fetchBooks();
    }
  }, [navigate]);

  // 2️⃣ Fetch books (only if logged in)
  const fetchBooks = async () => {
    try {
      const res = await privateAPI.get("/book/get");
      setBooks(res.data.data || []);
    } catch (error) {
      console.error("API Error: ", error.response?.data || error.message);
      toast.error("Couldn't get books. Try again");
    }
  };

  // 3️⃣ Send borrow request
  const sendRequest = async (bookId) => {
    try {
      await publicAPI.post("/borrower/request", { bookId });
      toast.success(
        "Your request for borrowing the book was sent successfully!"
      );
    } catch (error) {
      console.error("API Error: ", error.response?.data || error.message);
      toast.error("Couldn't process request. Try again");
    }
  };

  // 4️⃣ Filter books
  const filteredBooks = books
    .filter(
      (b) =>
        b.title?.toLowerCase().includes(search.toLowerCase()) ||
        b.author?.toLowerCase().includes(search.toLowerCase())
    )
    .filter((b) => {
      if (filter === "All") return true;
      if (filter === "Available") return Number(b.available) > 0;
      if (filter === "Out of Stock") return Number(b.available) === 0;
      return true;
    });

  return (
    <div className="min-h-screen bg-[#F3F4F6] font-sans">
      <GeneralNavBar />

      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-[#111827] mb-1">
            Explore Books
          </h1>
          <p className="text-[#6B7280]">
            Browse and filter the library's book collection
          </p>
        </div>
      </div>

      {/* Search & Filter Card */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 mb-8">
        <div className="bg-white p-3 md:p-6 rounded-xl border border-[#E5E7EB] flex flex-col gap-4">
          <h6 className="font-bold text-md">Search & Filter</h6>
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <input
              type="text"
              placeholder="Search by title or author..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 max-w-sm min-w-0 p-2 md:p-3 border bg-[#F3F4F6] border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#166FE5] placeholder-[#6B7280] transition text-sm"
              style={{ fontFamily: "Quicksand, sans-serif" }}
            />
            <select
              name="Filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="flex-none max-w-sm md:w-[200px] min-w-0 appearance-none rounded-xl border border-[#E5E7EB] bg-[#F3F4F6] px-4 py-2 text-gray-700 text-base focus:border-[#166FE5] focus:ring-2 focus:ring-[#166FE5] transition"
            >
              <option value="All">All</option>
              <option value="Available">Available</option>
              <option value="Out of Stock">Out Of Stock</option>
            </select>
          </div>
          <div className="flex justify-between">
            <span className="text-xs mt-2 block">
              Filtered by: {filter === "All" ? "" : filter}
            </span>
          </div>
        </div>
      </div>

      {/* Books List */}
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <div
                key={book._id}
                className="bg-white rounded-2xl shadow-md border border-[#E5E7EB] hover:shadow-xl transition-shadow duration-300 p-4 flex flex-col justify-between"
              >
                {/* Book Image */}
                <div className="w-full h-40 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden mb-4">
                  {book.image ? (
                    <img
                      src={book.image}
                      alt={book.title}
                      className="object-cover w-full h-full rounded-xl"
                    />
                  ) : (
                    <span className="text-gray-400 text-lg">No Image</span>
                  )}
                </div>

                {/* Book Info */}
                <div className="space-y-2 flex-1">
                  <h3 className="text-lg font-bold text-[#111827] truncate">
                    {book.title}
                  </h3>
                  <p className="text-[#6B7280] text-sm">
                    Author: {book.author}
                  </p>
                  <p className="text-[#6B7280] text-sm">
                    Available: {book.available}
                  </p>
                </div>

                {/* Availability & Borrow */}
                <div className="flex flex-col space-y-3 mt-4">
                  <p
                    className={`font-semibold ${
                      Number(book.available) > 0
                        ? "text-[#34A853]"
                        : "text-[#EA4335]"
                    }`}
                  >
                    {Number(book.available) > 0 ? "Available" : "Out of Stock"}
                  </p>

                  <button
                    className={`py-2 px-4 rounded-xl font-medium text-white transition-colors duration-200 ${
                      Number(book.available) > 0
                        ? "bg-[#166FE5] hover:bg-[#1A73E8]"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                    onClick={() =>
                      Number(book.available) > 0 && sendRequest(book._id)
                    }
                    disabled={Number(book.available) <= 0}
                  >
                    Borrow
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-[#6B7280]">
              No books found
            </p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookManagement;
