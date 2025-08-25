import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

const ProfileManagement = () => {
  const [profile, setProfile] = useState({
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Librarian",
    password: "",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!"); // later replace with API call
  };

  return (
    <div className="p-6 bg-[#FDF6EC] min-h-screen text-[#4A3F35] font-body">
      {/* Header */}
      <h2
        className="text-3xl font-bold mb-6"
        style={{ fontFamily: "Merriweather, serif" }}
      >
        Profile Management
      </h2>

      <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
        {/* Avatar + Info */}
        <div className="flex flex-col items-center mb-6">
          <FaUserCircle className="text-6xl text-[#A3B18A]" />
          <h3 className="text-xl font-bold mt-2">{profile.name}</h3>
          <p className="text-gray-600">{profile.role}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{
                borderColor: "#D19C7A",
                fontFamily: "Quicksand, sans-serif",
              }}
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{
                borderColor: "#D19C7A",
                fontFamily: "Quicksand, sans-serif",
              }}
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Role</label>
            <input
              type="text"
              name="role"
              value={profile.role}
              readOnly
              className="w-full p-2 border rounded-lg bg-gray-100 cursor-not-allowed"
              style={{ fontFamily: "Quicksand, sans-serif" }}
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Password</label>
            <input
              type="password"
              name="password"
              value={profile.password}
              onChange={handleChange}
              placeholder="Enter new password"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{
                borderColor: "#D19C7A",
                fontFamily: "Quicksand, sans-serif",
              }}
            />
          </div>

          {/* Update Button */}
          <button
            type="submit"
            className="w-full py-2 rounded-lg font-semibold mt-4"
            style={{ backgroundColor: "#D19C7A", color: "#fff" }}
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileManagement;
