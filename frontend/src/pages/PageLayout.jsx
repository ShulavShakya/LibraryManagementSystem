import { Outlet } from "react-router-dom";
import SideBar from "../components/Librarian/SideBar";

const PageLayout = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64">
        <SideBar />
      </div>

      {/* Page content */}
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default PageLayout;
