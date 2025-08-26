import { useEffect, useState } from "react";
import { FaUndo, FaCheckCircle, FaClock } from "react-icons/fa";
import { privateAPI } from "../../utils/config";
import { toast } from "react-toastify";

const BorrowManagement = () => {
  const [search, setSearch] = useState("");
  const [borrows, setBorrows] = useState([]);
  // const [approval, setApproval] = useState(false);

  const filteredBorrows = borrows.filter(
    (b) =>
      b.book.toLowerCase().includes(search.toLowerCase()) ||
      b.borrower.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    fetchBorrowedBooks();
  }, []);

  const fetchBorrowedBooks = async () => {
    try {
      const res = await privateAPI.get("/borrower/admin/g");
      setBorrows(res.data.data || []);
    } catch (error) {
      console.error("Error: ", error);
      toast.error(
        "An error occured while getting the borrowed books. Try again"
      );
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
                <tr key={borrow.id} className="border-b hover:bg-[#FDF6EC]">
                  <td className="p-3">{borrow.book}</td>
                  <td className="p-3">{borrow.borrower}</td>
                  <td className="p-3">{borrow.borrowDate}</td>
                  <td className="p-3">{borrow.dueDate}</td>
                  <td className="p-3">
                    {/* Admin Status */}
                    {borrow.adminStatus === "pending" && (
                      <span className="px-2 py-1 rounded-full text-sm bg-yellow-200 text-yellow-800">
                        Pending Approval
                      </span>
                    )}
                    {borrow.adminStatus === "approved" && (
                      <span className="px-2 py-1 rounded-full text-sm bg-blue-200 text-blue-800">
                        Approved
                      </span>
                    )}
                    {borrow.adminStatus === "rejected" && (
                      <span className="px-2 py-1 rounded-full text-sm bg-red-200 text-red-800">
                        Rejected
                      </span>
                    )}

                    {/* Borrower Status (only show after approved) */}
                    {borrow.adminStatus === "approved" &&
                      borrow.borrowerStatus === "borrowed" && (
                        <span className="ml-2 px-2 py-1 rounded-full text-sm bg-purple-200 text-purple-800">
                          Borrowed
                        </span>
                      )}
                    {borrow.adminStatus === "approved" &&
                      borrow.borrowerStatus === "returned" && (
                        <span className="ml-2 px-2 py-1 rounded-full text-sm bg-green-200 text-green-800">
                          Returned
                        </span>
                      )}
                    {borrow.adminStatus === "approved" &&
                      borrow.borrowerStatus === "overdue" && (
                        <span className="ml-2 px-2 py-1 rounded-full text-sm bg-orange-200 text-orange-800">
                          Overdue
                        </span>
                      )}
                  </td>

                  <td className="p-3">
                    {borrow.status === "Borrowed" && (
                      <button
                        className="flex items-center gap-2 px-3 py-1 rounded-lg"
                        style={{ backgroundColor: "#D19C7A", color: "#fff" }}
                      >
                        <FaUndo /> Return
                      </button>
                    )}
                    {borrow.status !== "Borrowed" && (
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
