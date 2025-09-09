import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import apiClient from "../lib/axios";

// Unified root component for loading, auth verification and protected route logic.
const Root = () => {
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const verifyAuthState = async () => {
      if (useAuthStore.getState().isAuthenticated) {
        try {
          await apiClient.get("/auth/me");
        } catch {
          logout();
        }
      }
      setIsLoading(false);
    };
    verifyAuthState();
  }, [logout]);

  if (isLoading) {
    return <div>Loading session...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default Root;
