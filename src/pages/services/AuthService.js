import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const AuthService = {
  saveToken(token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const expiry = payload.exp * 1000; // Convert to milliseconds

      localStorage.setItem("auth_token", token);
      localStorage.setItem("authTokenExpiry", expiry.toString());
    } catch (error) {
      console.error("Invalid token format");
    }
  },

  getToken() {
    return localStorage.getItem("auth_token");
  },

  isTokenExpired() {
    const expiry = localStorage.getItem("authTokenExpiry");
    if (!expiry) return true;
    return Date.now() > parseInt(expiry, 10);
  },

  clear() {
    localStorage.clear();
  },

  logout() {
    AuthService.clear();
    window.location.href = "/sign-in";
  },
};

export default AuthService;
