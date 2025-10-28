import React from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "../Navbar";
import DemoGuide from "../DemoGuide";

const MainLayout: React.FC = () => {
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
      <DemoGuide />
      <Outlet />
    </>
  );
};

export default MainLayout;
