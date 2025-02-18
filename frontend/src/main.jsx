import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import CreateUser from "./pages/CreateUser.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <CreateUser></CreateUser>
  </StrictMode>
);
