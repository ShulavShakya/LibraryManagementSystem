import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import Navbar from "../components/Librarian/NavBar";
import GeneralNavBar from "../components/Borrower/GeneralNavBar";
import Footer from "../components/Borrower/Footer";

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
    alert("Profile updated successfully!");
  };

  const roleColor =
    profile.role === "Librarian" ? "bg-[#166FE5]" : "bg-[#34A853]";

  return (
    <div className="flex flex-col min-h-screen bg-[#F3F4F6] font-sans">
      <GeneralNavBar />
      <main className="flex-1 py-12 px-4 md:px-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {/* Left Column: Avatar + Info */}
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border border-[#E5E7EB]">
            <div className="w-32 h-32 rounded-full bg-[#166FE5] flex items-center justify-center shadow-lg mb-4">
              <FaUserCircle className="text-7xl text-white" />
            </div>
            <h3 className="text-xl font-bold mt-2 text-[#111827]">
              {profile.name}
            </h3>
            <span
              className={`mt-1 px-3 py-1 rounded-full text-white text-sm ${roleColor}`}
            >
              {profile.role}
            </span>

            <div className="mt-6 text-[#6B7280] text-sm space-y-1">
              <p>Email: {profile.email}</p>
              <p>Password: ******</p>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow-lg p-8 border border-[#E5E7EB]">
            <h2 className="text-2xl font-bold mb-6 text-[#111827]">
              Edit Profile
            </h2>
            <form onSubmit={handleUpdate} className="space-y-6">
              <div>
                <label className="block mb-2 font-semibold text-[#111827]">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#166FE5] border-[#E5E7EB] text-[#111827]"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-[#111827]">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#166FE5] border-[#E5E7EB] text-[#111827]"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-[#111827]">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={profile.password}
                  onChange={handleChange}
                  placeholder="Enter new password"
                  className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#166FE5] border-[#E5E7EB] text-[#111827]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-semibold mt-4 bg-[#166FE5] text-white hover:bg-[#1A73E8] transition duration-200"
              >
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfileManagement;
