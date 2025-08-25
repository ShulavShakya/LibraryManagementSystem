import SideBar from "../components/Librarian/SideBar";
import { Outlet } from "react-router-dom";
import StatsCard from "../components/Librarian/StatsCard";

const Dashboard = () => {
  const statsCards = [
    { title: "Total users", value: "142" },
    { title: "Books Borrowed", value: "142" },
    { title: "Total books", value: "142" },
    { title: "Available books", value: "142" },
  ];
  return (
    <div>
      {/* <SideBar /> */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-left"> Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((card, index) => (
            <StatsCard key={index} title={card.title} value={card.value} />
          ))}
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b">
              <span>John Doe checked in</span>
              <span className="text-gray-500 text-sm">9:15 AM</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span>Sarah Wilson submitted leave request</span>
              <span className="text-gray-500 text-sm">8:45 AM</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span>Mike Johnson checked out</span>
              <span className="text-gray-500 text-sm">Yesterday</span>
            </div>
          </div>
        </div>
      </div>
      <main className="flex-1 p-6 bg-[#F8F4ED] min-h-screen">
        <Outlet /> Page content
      </main>
    </div>
  );
};

export default Dashboard;
