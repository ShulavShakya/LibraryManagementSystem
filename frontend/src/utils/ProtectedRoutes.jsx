import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function ProtectedRoutes({ children, allowedRoles }) {
  const userCookie = Cookies.get("user");
  if (!userCookie) return <Navigate to="/" replace />;

  try {
    const user = JSON.parse(userCookie);
    if (allowedRoles.includes(user.role)) {
      return children;
    } else {
      return <Navigate to="/" replace />;
    }
  } catch (error) {
    console.error("Invalid cookie", error);
    return <Navigate to="/" replace />;
  }
}
