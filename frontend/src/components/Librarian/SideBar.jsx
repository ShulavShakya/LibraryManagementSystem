import { useState } from "react";
import Cookies from "js-cookie";
import {
  FaTachometerAlt,
  FaBook,
  FaUsers,
  FaExchangeAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SideBar = ({ activeTab, setActiveTab }) => {
  let user = {};
  console.log("SideBar props:", { activeTab, setActiveTab });

  try {
    const userCookie = Cookies.get("user");
    user = userCookie ? JSON.parse(userCookie) : {};
  } catch (err) {
    console.log("Error parsing user cookie:", err);
    user = {};
  }
  const role = user.role;
  const Navigate = useNavigate();

  const sideBarItems =
    role === "librarian"
      ? [
          { id: "dashboard", name: "Dashboard", icon: <FaTachometerAlt /> },
          { id: "books", name: "Manage Books", icon: <FaBook /> },
          { id: "borrow", name: "Borrow-List", icon: <FaExchangeAlt /> },
          { id: "borrowers", name: "Manage Users", icon: <FaUsers /> },
        ]
      : [
          { id: "dashboard", name: "Dashboard", icon: <FaTachometerAlt /> },
          { id: "books", name: "Books", icon: <FaBook /> },
          { id: "borrow", name: "Borrow-List", icon: <FaExchangeAlt /> },
        ];

  const handleLogout = () => {
    Cookies.remove("user");
    Cookies.remove("token");
    Navigate("/");
  };

  return (
    <div>
      <div className="fixed left-0 top-0 h-screen w-64 bg-white text-[#111827] font-sans border-r border-gray-300">
        {/* Sidebar Header */}
        <div className="flex items-center justify-center h-16">
          <h2 className="text-2xl font-bold text-center font-sans text-black">
            Lexicon
          </h2>
        </div>

        {/* Full-width Divider */}
        <div className="w-full border-b border-gray-300"></div>

        {/* Sidebar Items */}
        <nav className="flex flex-col gap-2 mt-4 p-4">
          {sideBarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === "logout") {
                  handleLogout();
                } else {
                  setActiveTab(item.id);
                }
              }}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 text-base ${
                activeTab === item.id
                  ? "bg-[#2563EB] text-white font-semibold"
                  : "text-[#6B7280] font-medium hover:bg-[#F3F4F6]"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="whitespace-nowrap">{item.name}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default SideBar;
