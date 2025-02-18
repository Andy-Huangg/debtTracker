import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Register from "./components/Auth/Register.jsx";
import Login from "./components/Auth/Login.jsx";
import Bills from "./components/pages/Bills.jsx";
import BillShares from "./components/pages/BillShares.jsx";
import LogOut from "./components/LogOut.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <Register></Register>
    <Login></Login>
    <LogOut></LogOut>
    <Bills></Bills>
    <BillShares></BillShares>
  </StrictMode>
);
