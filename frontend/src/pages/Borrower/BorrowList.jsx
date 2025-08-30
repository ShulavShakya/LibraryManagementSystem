import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { publicAPI } from "../../utils/config";
import GeneralNavBar from "../../components/Borrower/GeneralNavBar";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Footer from "../../components/Borrower/Footer";
import { useNavigate } from "react-router-dom";

const BorrowList = () => {
  const navigate = useNavigate();
  const [borrows, setBorrows] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredBorrows = borrows
    .filter(
      (b) =>
        b.bookId.title?.toLowerCase().includes(search.toLowerCase()) ||
        b.bookId.author?.toLowerCase().includes(search.toLowerCase())
    )
    .filter((b) => {
      if (filter === "All") return true;
      if (filter === "Pending") return b.status === "pending";
      if (filter === "Rejected") return b.status === "rejected";
      if (filter === "Returned") return b.status === "returned";
      if (filter === "Overdue") return b.status === "overdue";
      return true;
    });

  useEffect(() => {
    const user = Cookies.get("user");
    if (!user) {
      toast.error("Please login to view your borrowed books");
      navigate("/login");
    } else {
      fetchBorrowedBooks();
    }
  }, [navigate]);

  const fetchBorrowedBooks = async () => {
    try {
      const userCookie = Cookies.get("user");
      if (userCookie) {
        const user = JSON.parse(userCookie);
        const userId = user._id;
        const res = await publicAPI.get(`borrower/view/user/${userId}`);
        setBorrows(res.data.data || []);
      }
    } catch (err) {
      console.error(err);
      toast.error("You have not borrowed any book");
    }
  };

  const statusBadge = (status) => {
    const classes = {
      pending: "bg-yellow-200 text-yellow-800",
      approved: "bg-blue-200 text-blue-800",
      rejected: "bg-red-200 text-red-800",
      returned: "bg-green-200 text-green-800",
      overdue: "bg-orange-200 text-orange-800",
      default: "bg-gray-200 text-gray-600",
    };
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs ${
          classes[status] || classes.default
        }`}
      >
        {status?.charAt(0).toUpperCase() + status?.slice(1) || "Unknown"}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] font-sans">
      <GeneralNavBar />
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-[#111827] mb-1">
            My Borrowed Books
          </h1>
          <p className="text-[#6B7280]">
            Track your borrowed books and their status
          </p>
        </div>
      </div>
      {/* Search & Filter Card with Layout Buttons */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 mb-8">
        <div className="flex flex-col bg-white p-3 md:p-6 rounded-xl mx-auto w-full h-fit border border-[#D1D5DB] gap-4">
          {/* Left Side: Title & Description */}
          <h6 className="font-bold text-md">Search & Filter</h6>
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            {/* Middle: Search Input */}
            <input
              type="text"
              placeholder="Search by title or author..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 max-w-sm p-2 md:p-3 border bg-[#F3F4F6] border-[#D1D5DB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#166FE5] placeholder-[#6B7280] transition text-sm"
              style={{ fontFamily: "Quicksand, sans-serif" }}
            />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="flex-none max-w-sm md:w-[200px] appearance-none rounded-xl border border-[#D1D5DB] bg-[#F3F4F6] px-4 py-2 pr-10 text-gray-700 text-base focus:border-[#166FE5] focus:ring-2 focus:ring-[#166FE5] transition"
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
              <option value="Returned">Returned</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>
          <div className="flex justify-between">
            <span className="text-xs mt-2 block">
              Filtered by: {filter === "All" ? "" : filter}
            </span>

            {/* Layout Buttons */}
            {/* <div className="flex gap-2">
              <button
                onClick={() => setIsTableView(true)}
                className={`px-4 py-2 rounded-xl font-medium transition ${
                  isTableView
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Table View
              </button>
              <button
                onClick={() => setIsTableView(false)}
                className={`px-4 py-2 rounded-xl font-medium transition ${
                  !isTableView
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Card View
              </button> */}
            {/* </div> */}
          </div>
        </div>
      </div>
      {/* Conditional Layout */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 overflow-x-auto hidden md:block">
        <table className="min-w-full bg-white rounded-2xl border border-[#D1D5DB] overflow-hidden hidden md:table">
          <thead className="hover:bg-gray-100 text-left text-[#6B7280]">
            <tr>
              <th className="p-3">Book</th>
              <th className="p-3">Author</th>
              <th className="p-3">Borrowed Date</th>
              <th className="p-3">Due Date</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredBorrows.length > 0 ? (
              filteredBorrows.map((borrow) => (
                <tr key={borrow._id} className="hover:bg-[#F3F4F6]">
                  <td className="p-3">{borrow.bookId.title}</td>
                  <td className="p-3">{borrow.bookId.author}</td>
                  <td className="p-3">
                    {borrow.borrowDate
                      ? format(new Date(borrow.borrowDate), "PPP")
                      : "N/A"}
                  </td>
                  <td className="p-3">
                    {borrow.dueDate
                      ? format(new Date(borrow.dueDate), "PPP")
                      : "N/A"}
                  </td>
                  <td className="p-3">{statusBadge(borrow.status)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No borrowed books found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:hidden">
        {filteredBorrows.length > 0 ? (
          filteredBorrows.map((borrow) => (
            <div
              key={borrow._id}
              className="bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition p-4 flex flex-col justify-between"
            >
              <div className="space-y-2 flex-1">
                <h3 className="text-lg font-bold text-gray-900 truncate">
                  {borrow.bookId.title}
                </h3>
                <p className="text-gray-500 text-sm">
                  Author: {borrow.bookId.author}
                </p>
                <p className="text-gray-500 text-sm">
                  Borrowed:{" "}
                  {borrow.borrowDate
                    ? format(new Date(borrow.borrowDate), "PPP")
                    : "N/A"}
                </p>
                <p className="text-gray-500 text-sm">
                  Due:{" "}
                  {borrow.dueDate
                    ? format(new Date(borrow.dueDate), "PPP")
                    : "N/A"}
                </p>
              </div>
              <div className="mt-4">{statusBadge(borrow.status)}</div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-[#6B7280]">
            You have no borrowed books.
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default BorrowList;
