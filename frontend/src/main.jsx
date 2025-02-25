import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import ErrorPage from "./components/pages/ErrorPage.jsx";
import Register from "./components/Auth/Register.jsx";
import Login from "./components/Auth/Login.jsx";

import HomePage from "./components/pages/HomePage.jsx";
import Dashboard from "./components/pages/Dashboard.jsx";
import DebtBySlug from "./components/pages/DebtBySlug.jsx";
import CreateDebt from "./components/pages/CreateDebt.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/CreateDebt",
    element: <CreateDebt />,
  },
  {
    path: "/debts/:slug",
    element: <DebtBySlug></DebtBySlug>,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
