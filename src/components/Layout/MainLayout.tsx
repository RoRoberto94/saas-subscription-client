import React from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "../Navbar";
import { useSocket } from "../../hooks/useSocket";

const MainLayout: React.FC = () => {
  useSocket();

  return (
    <>
      <Navbar />
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          duration: 5000,
          style: {
            background: "var(--background-light)",
            color: "var(--text-primary)",
          },
        }}
      />
      <Outlet />
    </>
  );
};

export default MainLayout;
