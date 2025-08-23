import { useState } from "react";
import Cookies from "js-cookie";
import {
  FaTachometerAlt,
  FaBook,
  FaUsers,
  FaExchangeAlt,
  FaSignOutAlt,
  FaUserCog,
} from "react-icons/fa";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const user = JSON.parse(Cookies.get("user") || "{}");
  const role = user.role;
  const [isOpen, setIsOpen] = useState(true);

  const sideBarItems =
    role === "librarian"
      ? [
          { id: "dashboard", name: "Dashboard", icon: <FaTachometerAlt /> },
          { id: "books", name: "Books", icon: <FaBook /> },
          { id: "borrow", name: "Borrow-List", icon: <FaExchangeAlt /> },
          { id: "borrowers", name: "Users", icon: <FaUsers /> },
          { id: "profile", name: "Profile", icon: <FaUserCog /> },
          { id: "logout", name: "Logout", icon: <FaSignOutAlt /> },
        ]
      : [
          { id: "dashboard", name: "Dashboard", icon: <FaTachometerAlt /> },
          { id: "books", name: "Books", icon: <FaBook /> },
          { id: "borrow", name: "Borrow-List", icon: <FaExchangeAlt /> },
          { id: "profile", name: "Profile", icon: <FaUserCog /> },
          { id: "logout", name: "Logout", icon: <FaSignOutAlt /> },
        ];

  return (
    <div
      className={`bg-white shadow-lg h-screen p-4 transition-width duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mb-6 p-2 bg-gray-200 rounded-full hover:bg-gray-300"
      >
        {isOpen ? "<" : ">"}
      </button>

      {isOpen && (
        <h2 className="text-2xl font-bold text-gray-700 mb-6">Library</h2>
      )}

      <nav className="flex flex-col gap-2">
        {sideBarItems.map((item) => {
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-4 p-2 rounded hover:bg-gray-100 ${
                activeTab === item.id
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "text-gray-700"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {isOpen && <span>{item.name}</span>}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
