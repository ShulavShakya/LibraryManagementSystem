import DashboardStats from "../components/Librarian/DashboardStats";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <h2 className="text-3xl font-bold mb-4 text-[#111827]">Dashboard</h2>

      {/* Stats Section */}
      <DashboardStats />

      {/* Recent Activities */}
      <div className="bg-white p-6 rounded-2xl shadow-md border border-[#E5E7EB]">
        <h3 className="text-xl font-semibold mb-4 text-[#111827]">
          Recent Activities
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center py-2 px-3 rounded-lg hover:bg-[#F3F4F6] transition">
            <span className="text-[#111827]">John Doe checked in</span>
            <span className="text-gray-500 text-sm">9:15 AM</span>
          </div>
          <div className="flex justify-between items-center py-2 px-3 rounded-lg hover:bg-[#F3F4F6] transition">
            <span className="text-[#111827]">
              Sarah Wilson submitted leave request
            </span>
            <span className="text-gray-500 text-sm">8:45 AM</span>
          </div>
          <div className="flex justify-between items-center py-2 px-3 rounded-lg hover:bg-[#F3F4F6] transition">
            <span className="text-[#111827]">Mike Johnson checked out</span>
            <span className="text-gray-500 text-sm">Yesterday</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
