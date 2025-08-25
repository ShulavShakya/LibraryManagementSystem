import { useState } from "react";
import Dashboard from "../Dashboard";
import UserManagement from "./UserManagement";
import BorrowManagement from "./BorrowManagement";
import ProfileManagement from "./ProfileManagement";
import SideBar from "../../components/Librarian/SideBar";
import BookManagement from "./BookManagement";

const LibrarianDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;

      case "books":
        return <BookManagement />;

      case "borrowers":
        return <UserManagement />;

      case "borrow":
        return <BorrowManagement />;

      case "profile":
        return <ProfileManagement />;

      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideBar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 p-8">{renderContent()}</div>
    </div>
  );
};

export default LibrarianDashboard;
