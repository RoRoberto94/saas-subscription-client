import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root";
import RegisterPage from "../pages/Register";
import LoginPage from "../pages/Login";
import MainLayout from "../components/Layout/MainLayout";
import DashboardPage from "../pages/Dashboard";
import PricingPage from "../pages/Pricing";

// Centralized routing configuration with a root layout for auth checks.
const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    element: <Root />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: "/",
            element: <DashboardPage />,
          },
          {
            path: "/dashboard",
            element: <DashboardPage />,
          },
          {
            path: "/pricing",
            element: <PricingPage />,
          },
        ],
      },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
