import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegisterPage from "../pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Pagina principala (Home)</div>,
  },
  {
    path: "/login",
    element: <div>Pagina de Login</div>,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/dashboard",
    element: <div>Pagina de Dashboard (Protejata)</div>,
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
