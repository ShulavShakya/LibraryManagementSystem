import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { publicAPI, privateAPI } from "../../utils/config";
import StatsCard from "./StatsCard";

const DashboardStats = () => {
  const [books, setBooks] = useState([]);
  const [totalBooks, setTotalBooks] = useState(0);
  const [users, setUsers] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState(0);
  const [totalOverdueBooks, setTotalOverdueBooks] = useState(0);

  useEffect(() => {
    fetchBooks();
    fetchUsers();
    fetchBorrowedBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await publicAPI.get("/api/book/get");
      setBooks(res.data.data || []);
      setTotalBooks(
        res.data.data.reduce((acc, book) => acc + (book.quantity || 0), 0)
      );
    } catch (error) {
      console.error("API Error: ", error.response?.data || error.message);
      toast.error("Couldn't get books. Try again");
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await privateAPI.get("/api/user/get");
      setUsers(res.data.data || []);
    } catch (error) {
      console.error("Error: ", error);
      toast.error("Error occured while getting the users data.");
    }
  };

  const fetchBorrowedBooks = async () => {
    try {
      const res = await privateAPI.get("/api/borrower/admin/get");
      const borrowed = res.data.data.filter(
        (book) => book.status === "approved"
      );
      setBorrowedBooks(borrowed || []);
      const totalOverdueBooks = borrowed.filter(
        (book) => book.dueDate < new Date()
      ).length;
      setTotalOverdueBooks(totalOverdueBooks);
    } catch (error) {
      console.error("Error: ", error);
      toast.error("Error occured while getting the borrowed books data.");
    }
  };

  const totalUsers = users.length;
  const totalBorrowedBooks = borrowedBooks.length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <StatsCard title="Total Users" value={totalUsers} />
      <StatsCard title="Total Books" value={totalBooks} />
      <StatsCard title="Borrowed Books" value={totalBorrowedBooks} />
      <StatsCard title="Overdue Books" value={totalOverdueBooks} />
    </div>
  );
};

export default DashboardStats;
