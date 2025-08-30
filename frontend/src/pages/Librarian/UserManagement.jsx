import { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { privateAPI } from "../../utils/config";
import { toast } from "react-toastify";

const UserManagement = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("all");
  const [formData, setFormData] = useState([
    { name: "", email: "", role: "", status: "" },
  ]);

  const statusColor = (user) => {
    switch (user.status) {
      case "active":
        return <span className="text-green-500">Active</span>;
      case "inactive":
        return <span className="text-red-500">Inactive</span>;
      default:
        return <span className="text-gray-500">Inactive</span>;
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users
    .filter(
      (u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.role.toLowerCase().includes(search.toLowerCase())
    )
    .filter((u) => {
      if (filter === "all") return true;
      if (filter === "active") return u.status === "active";
      if (filter === "inactive") return u.status === "inactive";
      return true;
    });

  const fetchUsers = async () => {
    try {
      const res = await privateAPI.get("/api/user/get");
      setUsers(res.data.data || []);
    } catch (error) {
      console.error("Error: ", error);
      toast.error("Error occured while getting the users data.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this department?"))
      return;
    try {
      await privateAPI.delete(`/api/user/delete/${id}`);
      fetchUsers();
      toast.success("User deleted successfully.");
    } catch (error) {
      console.error("Error: ", error);
      toast.error("Couldn't delete the user");
    }
  };

  const handleEdit = (user) => {
    setFormData({
      name: user.name || "",
      email: user.email || "",
      role: user.role || "",
      status: user.status || "active",
    });
    setEditingId(user._id);
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
    setFormData({ name: "", email: "", role: "", status: "Active" });
    setEditingId(null);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await privateAPI.put(`/api/user/update/${editingId}`, formData);
      toast.success("User updated successfully!");
      fetchUsers();
      setShowModal(false);
      setFormData({ name: "", email: "", role: "", status: "Active" });
      setEditingId(null);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Couldn't update user.");
    }
  };

  return (
    <div className="space-y-6 w-full  text-[#111827]">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-2">
        <div className="flex flex-col gap-2">
          <h2
            className="text-3xl text-[#111827] font-bold"
            // style={{ fontFamily: "Merriweather, serif" }}
          >
            User Management
          </h2>
          <p className="text-[#6B7280]">Manage your library's members</p>
        </div>
      </div>
      <div className="bg-white p-3 md:p-6 rounded-xl mx-auto w-full h-fit border border-[#D1D5DB] flex flex-col gap-4">
        <h6 className="font-bold text-md">Search & Filter</h6>
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 max-w-md min-w-0 p-2 md:p-3 border bg-[#F3F4F6] border-[#D1D5DB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#166FE5] placeholder-[#6B7280] transition text-sm"
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
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <span className="text-xs">
          Filtered by: {filter === "all" ? "" : filter}
        </span>
      </div>

      <h2
        className="text-xl text-[#111827] font-medium"
        // style={{ fontFamily: "Merriweather, serif" }}
      >
        Users:
      </h2>

      {/* Users Table */}
      <div className="bg-white p-4 rounded-2xl border border-[#E5E7EB] overflow-x-auto hidden md:block">
        <div className="overflow-x-auto max-w-full">
          <table className="min-w-full border-collapse text-sm divide-y divide-gray-200">
            <thead>
              <tr className="hover:bg-gray-100 text-[#374151]">
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-[#111827]">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-[#F9FAFB] transition ">
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4 capitalize">{user.role}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <button
                        className="px-4 py-2 rounded-lg bg-[#F3F4F6] text-[#111827] border border-[#D1D5DB] hover:bg-[#FBBC05] transition"
                        onClick={() => handleEdit(user)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-4 py-2 rounded-lg bg-[#F3F4F6] text-[#111827] border border-[#D1D5DB] hover:bg-[#EA4335] transition"
                        onClick={() => handleDelete(user._id)}
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
                    className="px-6 py-6 text-center text-gray-500 text-base md:text-lg"
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Update User Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-md shadow-lg space-y-4">
            <h3 className="text-xl md:text-2xl font-bold text-[#111827]">
              Update User
            </h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full p-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#A3B18A] transition"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full p-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#A3B18A] transition"
                required
              />
              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="w-full p-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#A3B18A] transition"
              >
                <option value="librarian">Librarian</option>
                <option value="borrower">Borrower</option>
              </select>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full p-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#A3B18A] transition"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 rounded-2xl bg-gray-300 hover:bg-gray-400 transition"
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
      <div className="md:hidden">
        <div className="flex flex-col gap-4 h-[500px] overflow-y-auto pr-2 border border-[#E5E7EB] rounded-2xl">
          {filteredUsers.map((user) => (
            <div
              key={user._id}
              className="bg-[#FFFFFF] p-4 rounded-xl shadow flex flex-col gap-2"
            >
              <div className="flex justify-between items-center">
                <span className="font-bold text-[#111827]">{user.name}</span>
                <span className="text-[#6B7280]">{user.role}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span>Email: {user.email}</span>
                <span>Status: {statusColor(user)}</span>
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  className="p-2 flex-1 rounded-xl bg-[#F3F4F6] text-[#111827] border border-[#E5E7EB] hover:bg-[#FBBC05] transition"
                  onClick={() => handleEdit(user)}
                >
                  Edit
                </button>
                <button
                  className="p-2 flex-1 rounded-xl bg-[#F3F4F6] text-[#111827] border border-[#E5E7EB] hover:bg-[#EA4335] transition"
                  onClick={() => handleDelete(user._id)}
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

export default UserManagement;
