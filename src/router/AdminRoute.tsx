import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const AdminRoute: React.FC = () => {
  const { user } = useAuth();

  if (user && user.role === "ADMIN") {
    return <Outlet />;
  }

  return <Navigate to="/dashboard" replace />;
};

export default AdminRoute;
