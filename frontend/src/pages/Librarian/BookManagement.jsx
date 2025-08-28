import { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { publicAPI, privateAPI } from "../../utils/config";
import { toast } from "react-toastify";

const BookManagement = () => {
  const [search, setSearch] = useState("");
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

  const filteredBooks = books.filter(
    (b) =>
      b.title?.toLowerCase().includes(search.toLowerCase()) ||
      b.author?.toLowerCase().includes(search.toLowerCase())
  );

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
    <div className="w-full bg-[#FDF6EC] min-h-screen text-[#4A3F35] font-body">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2
          className="text-3xl font-bold"
          style={{ fontFamily: "Merriweather, serif" }}
        >
          Book Management
        </h2>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg shadow"
          style={{ backgroundColor: "#A3B18A", color: "#fff" }}
          onClick={() => setShowModal(true)}
        >
          <FaPlus /> Add Book
        </button>
      </div>
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1"
          style={{
            borderColor: "#D19C7A",
            fontFamily: "Quicksand, sans-serif",
          }}
        />
        
      </div>
      {/* Books Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[500px] bg-white rounded-lg shadow overflow-x-auto">
          <thead>
            <tr className="text-left bg-[#A3B18A] text-white">
              <th className="p-3">Title</th>
              <th className="p-3">Author</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Available</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <tr key={book._id} className="border-b hover:bg-[#FDF6EC]">
                  <td className="p-3">{book.title}</td>
                  <td className="p-3">{book.author}</td>
                  <td className="p-3">{book.quantity}</td>
                  <td className="p-3">{book.available}</td>
                  <td className="p-3 flex gap-2">
                    <button
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: "#D19C7A", color: "#fff" }}
                      onClick={() => {
                        handleEdit(book);
                      }}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="p-2 rounded-lg bg-red-500 text-white"
                      onClick={() => {
                        handleDelete(book._id);
                      }}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No books found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Book Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/30 backdrop-blur-sm z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h3 className="text-xl font-bold mb-4">
              {editingId ? "Edit Book" : "Add new Book"}
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
                  className="w-full p-2 border rounded-lg"
                  required
                />
              ))}

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 rounded-lg bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg"
                  style={{ backgroundColor: "#A3B18A", color: "#fff" }}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookManagement;
