import { useEffect, useState } from "react";
import { FaUndo } from "react-icons/fa";
import { privateAPI } from "../../utils/config";
import { toast } from "react-toastify";
import { format } from "date-fns";

const BorrowManagement = () => {
  const [search, setSearch] = useState("");
  const [borrows, setBorrows] = useState([]);
  // const [approval, setApproval] = useState(false);

  const filteredBorrows = borrows.filter(
    (b) =>
      (b.bookId?.title || "").toLowerCase().includes(search.toLowerCase()) ||
      (b.userId?.name || "").toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    fetchBorrowedBooks();
  }, []);

  const fetchBorrowedBooks = async () => {
    try {
      const res = await privateAPI.get("/borrower/admin/get");
      setBorrows(res.data.data || []);
    } catch (error) {
      console.error("Error: ", error);
      toast.error(
        "An error occured while getting the borrowed books. Try again"
      );
    }
  };

  const handleReturn = async (id) => {
    try {
      const res = await privateAPI.post(`/borrower/${id}/return`);
      toast.success("Book returned successfully!");
      fetchBorrowedBooks(); // refresh list
    } catch (err) {
      toast.error("Error returning book");
      console.error(err);
    }
  };

  return (
    <div className="bg-[#FDF6EC] min-h-screen text-[#4A3F35] font-body">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2
          className="text-3xl font-bold"
          style={{ fontFamily: "Merriweather, serif" }}
        >
          Borrow Management
        </h2>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by book or borrower..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2"
          style={{
            borderColor: "#D19C7A",
            fontFamily: "Quicksand, sans-serif",
          }}
        />
      </div>

      {/* Borrow Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow">
          <thead>
            <tr className="text-left bg-[#A3B18A] text-white">
              <th className="p-3">Book</th>
              <th className="p-3">Borrower</th>
              <th className="p-3">Borrow Date</th>
              <th className="p-3">Due Date</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBorrows.length > 0 ? (
              filteredBorrows.map((borrow) => (
                <tr key={borrow._id} className="border-b hover:bg-[#FDF6EC]">
                  <td className="p-3">{borrow.bookId.title}</td>
                  <td className="p-3">{borrow.userId.name}</td>
                  <td>
                    {borrow.borrowDate
                      ? format(new Date(borrow.borrowDate), "PPpp")
                      : "N/A"}
                  </td>
                  <td>
                    {borrow.dueDate
                      ? format(new Date(borrow.dueDate), "PPpp")
                      : "N/A"}
                  </td>
                  <td className="p-3">
                    {borrow.status === "pending" && (
                      <span className="px-2 py-1 rounded-full text-sm bg-yellow-200 text-yellow-800">
                        Pending Approval
                      </span>
                    )}
                    {borrow.status === "approved" && (
                      <span className="px-2 py-1 rounded-full text-sm bg-blue-200 text-blue-800">
                        Approved
                      </span>
                    )}
                    {borrow.status === "rejected" && (
                      <span className="px-2 py-1 rounded-full text-sm bg-red-200 text-red-800">
                        Rejected
                      </span>
                    )}
                    {borrow.status === "returned" && (
                      <span className="px-2 py-1 rounded-full text-sm bg-green-200 text-green-800">
                        Returned
                      </span>
                    )}
                    {borrow.status === "overdue" && (
                      <span className="px-2 py-1 rounded-full text-sm bg-orange-200 text-orange-800">
                        Overdue
                      </span>
                    )}
                  </td>

                  <td className="p-3">
                    {borrow.status === "approved" && (
                      <button
                        className="flex items-center gap-2 px-3 py-1 rounded-lg"
                        style={{ backgroundColor: "#D19C7A", color: "#fff" }}
                        onClick={() => handleReturn(borrow._id)}
                      >
                        <FaUndo /> Return
                      </button>
                    )}
                    {borrow.status !== "approved" && (
                      <span className="text-gray-400 italic">No actions</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No borrow records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BorrowManagement;
