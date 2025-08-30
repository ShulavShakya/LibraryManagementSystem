import { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { publicAPI, privateAPI } from "../../utils/config";
import { toast } from "react-toastify";

const BookManagement = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    quantity: "",
    available: "",
  });

  const defaultState = {
    title: "",
    author: "",
    isbn: "",
    quantity: "",
    available: "",
  };

  const fields = ["title", "author", "isbn", "quantity", "available"];

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

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await publicAPI.get("/book/get");
      setBooks(res.data.data || []);
    } catch (error) {
      console.error("API Error: ", error.response?.data || error.message);
      toast.error("Couldn't get books. Try again");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await privateAPI.put(`/book/update/${editingId}`, formData);
        toast.success("Book updated successfully!");
      } else {
        await publicAPI.post("/book/add", formData);
        toast.success("Book added successfully!");
      }
      fetchBooks(); // refresh list
      handleCancel();
    } catch (error) {
      console.error("API Error: ", error.response?.data || error.message);
      toast.error("Operation Failed. Try again");
    }
  };

  const handleEdit = (books) => {
    setFormData(books);
    setEditingId(books._id);
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
    setFormData(defaultState);
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await publicAPI.delete(`/book/delete/${id}`);
      toast.success("Book deleted successfully");
      fetchBooks();
    } catch (error) {
      console.error(error);
      toast.error("Couldn't delete book");
    }
  };

  return (
    <div className="space-y-6 w-full text-black font-sans ">
      {/* Page Header */}
      <div
        className="flex flex-col md:flex-row justify-between items-center gap-2
      "
      >
        <div className="flex flex-col gap-2">
          <h2
            className="text-3xl text-[#111827] font-bold"
            // style={{ fontFamily: "Merriweather, serif" }}
          >
            Book Management
          </h2>
          <p className="text-[#6B7280]">
            Manage your library's book collection
          </p>
        </div>
        <button
          className="flex justify-center items-center gap-2 px-4 py-2 rounded-xl  transition w-[280px] md:w-fit
             bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800"
          onClick={() => setShowModal(true)}
        >
          <FaPlus className="text-lg md:text-xl " /> Add Book
        </button>
      </div>
      {/* Search Bar */}
      <div className="bg-white p-3 md:p-6 rounded-xl mx-auto w-full h-fit border border-[#D1D5DB] flex flex-col gap-4">
        <h6 className="font-bold text-md">Search & Filter</h6>
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <input
            type="text"
            placeholder="Search by title or author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 max-w-sm min-w-0 p-2 md:p-3 border bg-[#F3F4F6] border-[#D1D5DB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#166FE5] placeholder-[#6B7280] transition text-sm"
            style={{ fontFamily: "Quicksand, sans-serif" }}
          />
          <select
            name="Filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="flex-none md:w-[200px] min-w-0 appearance-none rounded-xl border border-[#D1D5DB] bg-[#F3F4F6] px-4 py-2 pr-10 text-gray-700 text-base focus:border-[#166FE5] focus:ring-2 focus:ring-[#166FE5] transition"
          >
            <option value="All">All</option>
            <option value="Available">Available</option>
            <option value="Out of Stock">Out Of Stock</option>
          </select>
        </div>
        <span className="text-xs">
          Filtered by: {filter === "all" ? "" : filter}
        </span>
      </div>

      <h2
        className="text-xl text-[#111827] font-semibold"
        // style={{ fontFamily: "Merriweather, serif" }}
      >
        Books:
      </h2>

      {/* Books Table */}
      <div className="bg-white p-4 h-[400px] overflow-y-auto rounded-2xl border border-[#D1D5DB] md:block hidden">
        <div className="overflow-x-auto ">
          <table className="min-w-full hidden md:table text-sm divide-y divide-gray-200 ">
            <thead>
              <tr className=" text-[#6B7280] hover:bg-[#F3F4F6]">
                <th className="p-3 text-left whitespace-nowrap">Title</th>
                <th className="p-3 text-left whitespace-nowrap">Author</th>
                <th className="p-3 text-left whitespace-nowrap">Quantity</th>
                <th className="p-3 text-left whitespace-nowrap">Available</th>
                <th className="p-3 text-left whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book) => (
                  <tr
                    key={book._id}
                    className="hover:bg-[#F3F4F6] transition rounded-xl"
                  >
                    <td className="p-3 whitespace-nowrap">{book.title}</td>
                    <td className="p-3 whitespace-nowrap">{book.author}</td>
                    <td className="p-3 whitespace-nowrap">{book.quantity}</td>
                    <td className="p-3 whitespace-nowrap">{book.available}</td>
                    <td className="p-3 whitespace-nowrap flex gap-2">
                      <button
                        className="p-2 w-[60px] rounded-xl transition bg-[#F3F4F6] text-[#111827] border border-[#D1D5DB] hover:bg-[#FBBC05] "
                        onClick={() => handleEdit(book)}
                      >
                        Edit
                      </button>
                      <button
                        className="p-2 w-[60px] rounded-xl bg-[#F3F4F6] text-[#111827] border border-[#D1D5DB] transition hover:bg-[#EA4335]"
                        onClick={() => handleDelete(book._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="p-4 text-center text-gray-500 text-base md:text-lg"
                  >
                    No books found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Add/Edit Book Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-md shadow-lg">
            <h3 className="text-xl md:text-2xl font-bold mb-4 text-[#111827]">
              {editingId ? "Edit Book" : "Add New Book"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {fields.map((field) => (
                <input
                  key={field}
                  type={
                    field.includes("quantity") || field.includes("available")
                      ? "number"
                      : "text"
                  }
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={formData[field]}
                  onChange={(e) =>
                    setFormData({ ...formData, [field]: e.target.value })
                  }
                  className="w-full p-3 md:p-4 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1A73E8] transition text-base md:text-lg text-[#111827]"
                  required
                />
              ))}

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 rounded-2xl bg-gray-300 hover:bg-[#EA4335] transition text-base md:text-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:bg-[#7B6F81] transition text-base md:text-lg"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="md:hidden h-[500px] overflow-y-auto pr-2 border border-[#E5E7EB] rounded-2xl">
        <div className="flex flex-col gap-4">
          {filteredBooks.map((book) => (
            <div
              key={book._id}
              className="bg-white p-4 rounded-xl shadow flex flex-col gap-2 border border-[#E5E7EB]"
            >
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between">
                  <span className="font-bold text-gray-700">{book.title}</span>
                  <span className="text-gray-600">- {book.author}</span>
                </div>
                <div className="flex gap-4 text-sm text-gray-600">
                  <span>Qty: {book.quantity}</span>
                  <span>Available: {book.available}</span>
                </div>
              </div>

              <div className="flex gap-2 mt-2">
                <button
                  className="p-2 w-[60px] rounded-xl transition bg-gray-100 text-gray-900 border border-gray-300 hover:bg-yellow-400"
                  onClick={() => handleEdit(book)}
                >
                  Edit
                </button>
                <button
                  className="p-2 w-fit rounded-xl bg-gray-100 text-gray-900 border border-gray-300 transition hover:bg-red-500 hover:text-white"
                  onClick={() => handleDelete(book._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookManagement;
