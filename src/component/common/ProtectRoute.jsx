// src/routes/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("loggedin-user"));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Optional: Redirect unauthorized users to a 403 or home page
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
