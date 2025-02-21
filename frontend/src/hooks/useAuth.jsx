import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  let isAuthenticated = false;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp > currentTime) {
        isAuthenticated = true;
      }
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  useEffect(() => {
    if (!isAuthenticated && location.pathname !== "/register") {
      navigate("/login");
    } else if (
      (isAuthenticated && location.pathname === "/register") ||
      location.pathname === "/login"
    ) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate, location.pathname]);

  return isAuthenticated;
};

export default useAuth;
