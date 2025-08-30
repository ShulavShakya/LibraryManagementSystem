import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import BorrowList from "./pages/Borrower/BorrowList";
import BookManagement from "./pages/Borrower/BookManagement";
import LibrarianDashboard from "./pages/Librarian/LibrarianDashboard";
import PageLayout from "./pages/PageLayout";
import ProfileManagement from "./pages/ProfileManagement";
import LandingPage from "./pages/LandingPage";
import AboutUs from "./pages/Borrower/AboutUs";
import ContactMe from "./pages/Borrower/ContactMe";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/contact" element={<ContactMe />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/my-borrows" element={<BorrowList />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/explore-books" element={<BookManagement />} />
      <Route path="register" element={<Register />} />
      <Route path="/profile" element={<ProfileManagement />} />
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoutes allowedRoles={["librarian"]}>
            <PageLayout />
          </ProtectedRoutes>
        }
      >
        <Route index element={<LibrarianDashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
