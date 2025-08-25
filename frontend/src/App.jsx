import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import BorrowerDashboard from "./pages/Borrower/BorrowerDashboard";
import LibrarianDashboard from "./pages/Librarian/LibrarianDashboard";
import PageLayout from "./pages/PageLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="register" element={<Register />} />
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
      <Route
        path="/user-dashboard"
        element={
          <ProtectedRoutes allowedRoles={["borrower"]}>
            <PageLayout />
          </ProtectedRoutes>
        }
      >
        <Route index element={<BorrowerDashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
