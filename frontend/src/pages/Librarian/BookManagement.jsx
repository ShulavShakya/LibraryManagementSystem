import { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { publicAPI } from "../../utils/config";
import { toast } from "react-toastify";

const BookManagement = () => {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    isbn: "",
    quantity: "",
  });

  const defaultState = {
    title: "",
    author: "",
    isbn: "",
    quantity: "null",
  };

  const handleCancel = () => {
    setShowModal(false);
    setNewBook(defaultState);
  };

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

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      await publicAPI.post("/book/add", newBook);
      toast.success("Book added successfully!");
      setShowModal(false);
      setNewBook({ title: "", author: "", isbn: "", quantity: 0 });
      fetchBooks(); // refresh list
    } catch (error) {
      console.error("API Error: ", error.response?.data || error.message);
      toast.error("Couldn't add book. Try again");
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
        <table className="w-full min-w-[500px] bg-white rounded-lg shadow">
          <thead>
            <tr className="text-left bg-[#A3B18A] text-white">
              <th className="p-3">Title</th>
              <th className="p-3">Author</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <tr key={book._id} className="border-b hover:bg-[#FDF6EC]">
                  <td className="p-3">{book.title}</td>
                  <td className="p-3">{book.author}</td>
                  <td className="p-3 flex gap-2">
                    <button
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: "#D19C7A", color: "#fff" }}
                    >
                      <FaEdit />
                    </button>
                    <button className="p-2 rounded-lg bg-red-500 text-white">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-4 text-center text-gray-500">
                  No books found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Add Book Modal */}
      {/* Add Book Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/30 backdrop-blur-sm z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h3 className="text-xl font-bold mb-4">Add New Book</h3>
            <form onSubmit={handleAddBook} className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={newBook.title}
                onChange={(e) =>
                  setNewBook({ ...newBook, title: e.target.value })
                }
                className="w-full p-2 border rounded-lg"
                required
              />
              <input
                type="text"
                placeholder="Author"
                value={newBook.author}
                onChange={(e) =>
                  setNewBook({ ...newBook, author: e.target.value })
                }
                className="w-full p-2 border rounded-lg"
                required
              />
              <input
                type="text"
                placeholder="ISBN"
                value={newBook.isbn}
                onChange={(e) =>
                  setNewBook({ ...newBook, isbn: e.target.value })
                }
                className="w-full p-2 border rounded-lg"
              />
              <input
                type="number"
                placeholder="Quantity"
                value={newBook.quantity}
                onChange={(e) =>
                  setNewBook({ ...newBook, quantity: e.target.value })
                }
                className="w-full p-2 border rounded-lg"
                required
              />

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
