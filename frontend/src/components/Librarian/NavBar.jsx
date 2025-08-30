import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import Login from "../../pages/Login";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // example state
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileName, setProfileName] = useState("Profile");
  const navigate = useNavigate();

  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      const user = JSON.parse(userCookie);
      setIsLoggedIn(true);
      setProfileName(user.name || "Profile");
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("user");
    Cookies.remove("token");
    setIsLoggedIn(false);
    setProfileName("Profile");
    navigate("/");
  };

  return (
    <>
      <nav className="bg-white px-6 py-2.5 flex justify-between items-center h-16">
        <span>Good Day, Admin</span>

        {/* Right side */}
        <div className="flex items-center space-x-4 ml-6">
          {!isLoggedIn ? (
            <button
              className="px-4 py-2 text-[#3B82F6] font-semibold border border-[#3B82F6] rounded-lg hover:bg-[#EFF6FF] transition"
              onClick={() => navigate("/login")}
            >
              Sign In
            </button>
          ) : (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <FaUserCircle className="text-3xl text-[#6B7280]" />
                <span className="font-semibold text-[#111827]">
                  {profileName}
                </span>
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-[#E5E7EB] rounded-lg shadow-lg py-2 text-left">
                  <button
                    className="px-4 py-2 hover:bg-[#F3F4F6] text-[#111827] w-full text-left transition"
                    onClick={() => navigate("/profile")}
                  >
                    My Account
                  </button>
                  <button
                    onClick={() => {
                      setIsLoggedIn(false);
                      handleLogout();
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-[#F3F4F6] text-red-600 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
      <div className="w-full border-b border-gray-300"></div>
    </>
  );
};

export default Navbar;
