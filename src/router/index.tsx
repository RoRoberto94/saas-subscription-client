import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegisterPage from "../pages/Register";
import LoginPage from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../components/Layout/MainLayout";
import DashboardPage from "../pages/Dashboard";

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
        element: <div>Pagina principala(Home)</div>,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/dashboard",
            element: <DashboardPage />,
          },
        ],
      },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
