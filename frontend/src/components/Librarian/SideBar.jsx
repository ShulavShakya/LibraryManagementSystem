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
  const navigate = useNavigate();

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
    navigate("/");
  };

  return (
    <div>
      <div
        className={`fixed left-0 top-0 h-screen w-64 shadow-lg p-4 bg-[#FDF6EC] text-[#4A3F35]-[Quicksand]`}
      >
        <div className="flex items-center gap-25 mb-6">
          <h2 className="w-full text-2xl font-bold text-center font-[Merriweather] text-[#4A3F35] ">
            Library
          </h2>
        </div>

        <nav className="flex flex-col gap-2">
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
              className={`flex items-center gap-4 px-3 py-2 rounded transition-colors duration-200 ${
                activeTab === item.id ? "font-semibold" : "font-medium"
              }`}
              style={{
                backgroundColor:
                  activeTab === item.id ? "#D19C7A" : "transparent",
                color: activeTab === item.id ? "#fff" : "#4A3F35",
                fontFamily: "Quicksand, sans-serif",
                fontSize: "16px",
              }}
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
