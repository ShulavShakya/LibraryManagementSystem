import React, { useState, useEffect } from "react";
import {
  FaUserCircle,
  FaHome,
  FaEnvelope,
  FaBook,
  FaInfoCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const GeneralNavBar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileName, setProfileName] = useState("Get Started");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navlinks = [
    { name: "Home", icon: <FaHome />, navigate: () => navigate("/") },
    {
      name: "Contact",
      icon: <FaEnvelope />,
      navigate: () => navigate("/contact"),
    },
    {
      name: "Explore Books",
      icon: <FaBook />,
      navigate: () => navigate("/explore-books"),
    },
    {
      name: "About Us",
      icon: <FaInfoCircle />,
      navigate: () => navigate("/about-us"),
    },
    {
      name: "My Borrows",
      icon: <FaBook />,
      navigate: () => navigate("/my-borrows"),
    },
  ];

  const token = Cookies.get("token");
  const userCookie = Cookies.get("user");
  let user = null;
  try {
    if (userCookie) user = JSON.parse(userCookie);
  } catch (e) {
    console.error("Failed to parse user cookie", e);
  }

  const handleLogout = () => {
    Cookies.remove("token", token);
    Cookies.remove("user", user);
    setIsLoggedIn(false);
    setProfileName("Get Started");
    navigate("/");
  };

  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      const user = JSON.parse(userCookie);
      setIsLoggedIn(true);
      setProfileName(user.name || "Profile");
    }
  }, []);

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 rounded-md bg-blue-600 flex items-center justify-center text-white font-bold">
          W
        </div>
        <span className="text-lg font-semibold">TheWhimsical</span>
      </div>

      {/* Links */}
      <ul className="flex space-x-5">
        {navlinks.map((link) => (
          <li
            key={link.name}
            className="hover:text-blue-600 cursor-pointer"
            onClick={link.navigate}
          >
            <span className="block md:hidden text-xl">{link.icon}</span>
            <span className="hidden md:block">{link.name}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <div>
        {!isLoggedIn ? (
          <button
            className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700"
            onClick={() => navigate("/login")}
          >
            Get Started
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
              <div className="absolute z-50 right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 text-left">
                <button
                  className="px-4 py-2 w-full text-left text-gray-800 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200 font-medium rounded-md"
                  onClick={() => navigate("/profile")}
                >
                  My Account
                </button>
                <button
                  onClick={() => {
                    setIsLoggedIn(false);
                    handleLogout();
                  }}
                  className="px-4 py-2 w-full text-left text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-200 font-medium rounded-md"
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

export default GeneralNavBar;
