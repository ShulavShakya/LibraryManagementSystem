import { Outlet } from "react-router-dom";
import SideBar from "../components/Librarian/SideBar";
import Navbar from "../components/Librarian/NavBar";

const PageLayout = () => {
  return (
    <>
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 h-full fixed">
          <SideBar />
        </div>

        <div className=" ml-64 flex flex-col w-full">
          <div className="bg-white">
            <Navbar />
            <div className="">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageLayout;
