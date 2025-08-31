import { useEffect, useState } from "react";
import { FaUndo } from "react-icons/fa";
import { privateAPI } from "../../utils/config";
import { toast } from "react-toastify";
import { format } from "date-fns";

const BorrowManagement = () => {
  const [search, setSearch] = useState("");
  const [borrows, setBorrows] = useState([]);
  const [filter, setFilter] = useState("all");

  const statusColor = (borrow) => {
    switch (borrow.status) {
      case "approved":
        return <span className="text-blue-800">Approved</span>;
      case "pending":
        return <span className="text-yellow-500">Pending</span>;
      case "rejected":
        return <span className="text-red-500">Rejected</span>;
      case "returned":
        return <span className="text-green-500">Returned</span>;
      default:
        return <span className="text-gray-500">Unknown</span>;
    }
  };
  // const [approval, setApproval] = useState(false);

  const filteredBorrows = borrows
    .filter(
      (b) =>
        (b.bookId?.title || "").toLowerCase().includes(search.toLowerCase()) ||
        (b.userId?.name || "").toLowerCase().includes(search.toLowerCase())
    )
    .filter((b) => {
      if (filter === "all") return true;
      if (filter === "approved") return b.status === "approved";
      if (filter === "pending") return b.status === "pending";
      if (filter === "rejected") return b.status === "rejected";
      if (filter === "overdue") return b.status === "overdue";
      return true;
    });

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

  const handleApprove = async (id) => {
    try {
      await privateAPI.put(`/borrower/${id}/handle`, { action: "approve" });
      toast.success("Request approved!");
      fetchBorrowedBooks();
    } catch (error) {
      console.log("Error: ", error);
      toast.error("Could not approve request");
    }
  };

  const handleReject = async (id) => {
    try {
      await privateAPI.put(`/borrower/${id}/handle`, { action: "reject" });
      toast.success("Request rejected");
    } catch (error) {
      console.log("Error: ", error);
      toast.error("Couldnot reject request");
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
    <div className="space-y-6 w-full text-black font-sans ">
      {/* Page Header */}
      <div className="flex justify-between items-center flex-col md:flex-row">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl text-[#111827] font-bold">
            Borrow Management
          </h2>
          <p className="text-[#6B7280]">Manage and track borrow records</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-3 md:p-6 rounded-xl mx-auto w-full border border-[#D1D5DB] flex flex-col gap-4">
        <h6 className="font-bold text-md">Search & Filter</h6>
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <input
            type="text"
            placeholder="Search by book or borrower..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 max-w-md min-w-0 p-2 md:p-3 border bg-[#F3F4F6] border-[#D1D5DB] rounded-xl 
                     focus:outline-none focus:ring-2 focus:ring-[#166FE5] placeholder-[#6B7280] transition text-sm"
            style={{ fontFamily: "Quicksand, sans-serif" }}
          />
          <select
            name="Filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="flex-none min-w-[150px] md:min-w-[200px] appearance-none rounded-xl border border-[#D1D5DB] 
                     bg-[#F3F4F6] px-4 py-2 pr-10 text-gray-700 text-base focus:border-[#166FE5] focus:ring-2 
                     focus:ring-[#166FE5] transition"
          >
            <option value="all">All</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="returned">Returned</option>
            <option value="overdue">Overdue</option>
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
        Borrow List:
      </h2>

      {/* Borrow Table */}
      <div className="bg-white p-4 h-[400px] overflow-y-auto rounded-2xl border border-[#D1D5DB] md:block hidden">
        <div className="overflow-auto ">
          <table className="min-w-full hidden md:table text-sm divide-y divide-gray-200 ">
            <thead>
              <tr className="text-[#6B7280] hover:bg-[#F3F4F6]">
                <th className="p-3 text-left whitespace-nowrap">Book</th>
                <th className="p-3 text-left whitespace-nowrap">Borrower</th>
                <th className="p-3 text-left whitespace-nowrap">Borrow Date</th>
                <th className="p-3 text-left whitespace-nowrap">Due Date</th>
                <th className="p-3 text-left whitespace-nowrap">Status</th>
                <th className="p-3 text-left whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredBorrows.length > 0 ? (
                filteredBorrows.map((borrow) => (
                  <tr
                    key={borrow._id}
                    className="hover:bg-[#F3F4F6] transition rounded-xl"
                  >
                    <td className="p-3">{borrow.bookId.title}</td>
                    <td className="p-3">{borrow.userId.name}</td>
                    <td className="p-3">
                      {borrow.borrowDate
                        ? format(new Date(borrow.borrowDate), "PPpp")
                        : "N/A"}
                    </td>
                    <td className="p-3">
                      {borrow.dueDate
                        ? format(new Date(borrow.dueDate), "PPpp")
                        : "N/A"}
                    </td>
                    <td className="p-3">
                      {borrow.status === "pending" && (
                        <span className="px-2 py-1 rounded-full text-xs bg-yellow-200 text-yellow-800">
                          Pending
                        </span>
                      )}
                      {borrow.status === "approved" && (
                        <span className="px-2 py-1 rounded-full text-xs bg-blue-200 text-blue-800">
                          Approved
                        </span>
                      )}
                      {borrow.status === "rejected" && (
                        <span className="px-2 py-1 rounded-full text-xs bg-red-200 text-red-800">
                          Rejected
                        </span>
                      )}
                      {borrow.status === "returned" && (
                        <span className="px-2 py-1 rounded-full text-xs bg-green-200 text-green-800">
                          Returned
                        </span>
                      )}
                      {borrow.status === "overdue" && (
                        <span className="px-2 py-1 rounded-full text-xs bg-orange-200 text-orange-800">
                          Overdue
                        </span>
                      )}
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      {(() => {
                        switch (borrow.status) {
                          case "approved":
                            return (
                              <button
                                className="p-2 px-4 rounded-xl transition bg-[#F3F4F6] text-[#111827] border border-[#D1D5DB] hover:bg-[#FBBC05] flex items-center gap-2"
                                onClick={() => handleReturn(borrow._id)}
                              >
                                Return
                              </button>
                            );
                          case "pending":
                            return (
                              <div className="flex gap-2">
                                <button
                                  className="p-2 px-4 rounded-xl transition bg-yellow-200 text-yellow-800 flex items-center gap-2"
                                  onClick={() => handleApprove(borrow._id)}
                                >
                                  Accept
                                </button>
                                <button
                                  className="p-2 px-4 rounded-xl transition bg-yellow-200 text-yellow-800 flex items-center gap-2"
                                  onClick={() => handleReject(borrow._id)}
                                >
                                  Reject
                                </button>
                              </div>
                            );
                          case "rejected":
                            return (
                              <span className="text-red-600 italic">
                                Rejected
                              </span>
                            );
                          case "returned":
                            return (
                              <span className="text-green-600 italic">
                                Returned
                              </span>
                            );
                          default:
                            return (
                              <span className="text-gray-400 italic">
                                No actions
                              </span>
                            );
                        }
                      })()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="p-4 text-center text-gray-500 text-base md:text-lg"
                  >
                    No borrow records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="md:hidden h-[400px] overflow-y-auto pr-2 border border-[#E5E7EB] rounded-2xl">
        <div className="flex flex-col gap-4">
          {filteredBorrows.map((borrow) => (
            <div
              key={borrow._id}
              className="bg-[#FFFFFF] p-4 rounded-xl shadow flex flex-col gap-2"
            >
              <div className="flex justify-between items-center">
                <span className="font-bold text-[#111827]">
                  {borrow.bookId.title}
                </span>
                <span className="text-[#6B7280]">{statusColor(borrow)}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span>Borrower: {borrow.userId.name}</span>
                <span></span>
                <span>
                  Due:{" "}
                  {borrow.status === "approved"
                    ? new Date(borrow.dueDate).toLocaleDateString()
                    : "N/A"}
                </span>
                <span>
                  Returned:{" "}
                  {borrow.status === "returned"
                    ? new Date(borrow.returnDate).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
              <div className="flex gap-2 mt-2">
                {borrow.status === "pending" && (
                  <>
                    <button
                      className="p-2 flex-1 rounded-xl bg-yellow-200 text-yellow-800 border border-[#E5E7EB] hover:bg-yellow-300 transition"
                      onClick={() => handleApprove(borrow._id)}
                    >
                      Approve
                    </button>
                    <button
                      className="p-2 flex-1 rounded-xl bg-red-200 text-red-800 border border-[#E5E7EB] hover:bg-red-300 transition"
                      onClick={() => handleReject(borrow._id)}
                    >
                      Reject
                    </button>
                  </>
                )}
                {borrow.status === "approved" && (
                  <button
                    className="p-2 flex-1 rounded-xl bg-[#F3F4F6] text-[#111827] border border-[#E5E7EB] hover:bg-[#FBBC05] transition"
                    onClick={() => handleReturn(borrow._id)}
                  >
                    Returned
                  </button>
                )}
                {(borrow.status === "rejected" ||
                  borrow.status === "returned") && (
                  <span className="text-gray-500 italic flex-1">
                    No actions
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BorrowManagement;
