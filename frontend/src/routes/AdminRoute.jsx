import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AdminRoute = () => {
  const token = localStorage.getItem("token");

  // Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);

    // Not adminx`
    if (decoded.role !== "admin") {
      return <Navigate to="/" replace />;
    }

    // Admin allowed
    return <Outlet />;
  } catch (error) {
    return <Navigate to="/login" replace />;
  }
};

export default AdminRoute;
