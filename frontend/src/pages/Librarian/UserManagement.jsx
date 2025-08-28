import { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { privateAPI } from "../../utils/config";
import { toast } from "react-toastify";

const UserManagement = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState([
    { name: "", email: "", role: "", status: "" },
  ]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
  );

  const fetchUsers = async () => {
    try {
      const res = await privateAPI.get("/user/get");
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
      await privateAPI.delete(`/user/delete/${id}`);
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
      await privateAPI.put(`/user/update/${editingId}`, formData);
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
    <div className=" bg-[#FDF6EC] min-h-screen text-[#4A3F35] font-body ">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2
          className="text-3xl font-bold"
          style={{ fontFamily: "Merriweather, serif" }}
        >
          User Management
        </h2>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, email, or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 border-[#D19C7A]"
          style={{
            fontFamily: "Quicksand, sans-serif",
          }}
        />
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto w-full">
        <table className="w-full bg-white rounded-lg shadow">
          <thead>
            <tr className="text-left bg-[#A3B18A] text-white">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user._id} className="border-b hover:bg-[#FDF6EC]">
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.role}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        user.status === "active"
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="p-3 flex gap-2">
                    <button
                      className="p-2 rounded-lg bg-[#D19C7A] text-[#fff]"
                      onClick={() => handleEdit(user)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="p-2 rounded-lg bg-red-500 text-white"
                      onClick={() => {
                        handleDelete(user._id);
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
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/30 backdrop-blur-sm z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h3 className="text-xl font-bold mb-4">Update User</h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                type="text"
                placeholder="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full p-2 border rounded-lg"
                required
              />
              <input
                type="text"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full p-2 border rounded-lg"
                required
              />
              <select
                type="text"
                placeholder="Role"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="w-full p-4 border rounded-lg"
              >
                <option value="librarian">Librarian</option>
                <option value="borrower">Borrower</option>
              </select>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full p-2 border rounded-lg"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
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

export default UserManagement;
