import { jwtDecode } from "jwt-decode";

const CheckAuth = () => {
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

  return isAuthenticated;
};

export default CheckAuth;
