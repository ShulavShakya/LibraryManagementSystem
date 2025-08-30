import React from "react";
import { useState } from "react";
import SideBar from "../../components/Librarian/SideBar";
import Dashboard from "../Dashboard";
import BookManagement from "./BookManagement";
import BorrowManagement from "./BorrowManagement";
import ProfileManagement from "../ProfileManagement";

const BorrowerDashboard = () => {
  const [activeTab, setActiveTab] = useState("books");
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "books":
        return <BookManagement />;
      case "borrow":
        return <BorrowManagement />;
      case "profile":
        return <ProfileManagement />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div>
      <div className="flex min-h-screen bg-gray-100">
        <SideBar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 p-8">{renderContent()}</div>
      </div>
    </div>
  );
};

export default BorrowerDashboard;
