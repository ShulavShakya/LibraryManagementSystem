import DashboardStats from "../components/Librarian/DashboardStats";

const Dashboard = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-left"> Dashboard</h2>
      <DashboardStats />

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
  );
};

export default Dashboard;
