import { useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const UserManagement = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [editingId, setEditiingId] = useState([]);
  const [formData, setFormData] = useState([{ name: "", email: "", role: "" }]);

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-[#FDF6EC] min-h-screen text-[#4A3F35] font-body">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2
          className="text-3xl font-bold"
          style={{ fontFamily: "Merriweather, serif" }}
        >
          User Management
        </h2>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg shadow"
          style={{ backgroundColor: "#A3B18A", color: "#fff" }}
        >
          <FaPlus /> Add User
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, email, or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2"
          style={{
            borderColor: "#D19C7A",
            fontFamily: "Quicksand, sans-serif",
          }}
        />
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto">
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
                <tr key={user.id} className="border-b hover:bg-[#FDF6EC]">
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.role}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        user.status === "Active"
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
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
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
