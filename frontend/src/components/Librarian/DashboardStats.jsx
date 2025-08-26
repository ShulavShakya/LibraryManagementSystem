import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { publicAPI, privateAPI } from "../../utils/config";
import StatsCard from "./StatsCard";

const DashboardStats = () => {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchBooks(), fetchUsers();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await publicAPI.get("/book/get");
      setBooks(res.data.data || []);
    } catch (error) {
      console.error("API Error: ", error.response?.data || error.message);
      toast.error("Couldn't get books. Try again");
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await privateAPI.get("/user/get");
      setUsers(res.data.data || []);
    } catch (error) {
      console.error("Error: ", error);
      toast.error("Error occured while getting the users data.");
    }
  };

  const totalBooks = books.length;
  const totalUsers = users.length;
  const availableBooks = books.filter((b) => b.quantity > 0).length;
  const borrowedBooks = books.filter((b) => b.isBorrowed).length;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
      <StatsCard title="Total Users" value={totalUsers} />
      <StatsCard title="Total Books" value={totalBooks} />
      <StatsCard title="Availbale Books" value={availableBooks} />
      <StatsCard title="Borrowed Books" value={borrowedBooks} />
    </div>
  );
};

export default DashboardStats;
