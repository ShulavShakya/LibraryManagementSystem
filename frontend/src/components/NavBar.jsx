import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import Login from "../pages/Login";
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
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      {/* Logo / Brand */}
      <div className="text-2xl font-bold text-blue-600">
        Welcome Back, {profileName}
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-4">
        {!isLoggedIn ? (
          <>
            <button
              className="px-4 py-2 text-blue-600 font-semibold border border-blue-600 rounded-lg hover:bg-blue-50"
              onClick={() => {
                navigate("/");
              }}
            >
              Sign In
            </button>
          </>
        ) : (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <FaUserCircle className="text-3xl text-gray-600" />
              <span className="font-semibold">{profileName}</span>
            </button>

            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2 text-left">
                <button className="px-4 py-2 hover:bg-gray-100 text-gray-700 w-full text-left">
                  My Account
                </button>
                {/* <button className="px-4 py-2 hover:bg-gray-100 text-gray-700 w-full text-left">
                  Settings
                </button> */}
                <button
                  onClick={() => {
                    setIsLoggedIn(false);
                    handleLogout();
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
