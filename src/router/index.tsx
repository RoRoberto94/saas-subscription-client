import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root";
import RegisterPage from "../pages/Register";
import LoginPage from "../pages/Login";
import MainLayout from "../components/Layout/MainLayout";
import DashboardPage from "../pages/Dashboard";
import PricingPage from "../pages/Pricing";
import AdminRoute from "./AdminRoute";
import AdminPage from "../pages/Admin";
import HomePage from "../pages/Home";

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
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/pricing",
        element: <PricingPage />,
      },
      {
        element: <Root />,
        children: [
          {
            path: "/dashboard",
            element: <DashboardPage />,
          },
          {
            element: <AdminRoute />,
            children: [
              {
                path: "/admin",
                element: <AdminPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
