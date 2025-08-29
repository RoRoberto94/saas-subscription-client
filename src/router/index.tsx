import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Pagina principala (Home)</div>,
  },
  {
    path: "/register",
    element: <div>Pagina de Register</div>,
  },
  {
    path: "/dashboard",
    element: <div>Pagina de Dashboard (Protejata)</div>,
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
