// client/src/context/AuthContext.jsx
import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const googleToken = urlParams.get("token");
    const googleUser = urlParams.get("user");

    if (googleToken && googleUser) {
      // Handle server-side Google OAuth redirect
      const parsedUser = JSON.parse(decodeURIComponent(googleUser));
      setToken(googleToken);
      setUser(parsedUser);
      localStorage.setItem("token", googleToken);
      localStorage.setItem("user", JSON.stringify(parsedUser));
      axios.defaults.headers.common["Authorization"] = `Bearer ${googleToken}`;
      toast.success("Successfully logged in with Google!");
      navigate("/products", { replace: true });
    } else {
      // Load stored auth data
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
      }
    }
    setLoading(false);
  }, [location, navigate]);

  const login = async (email, password, isGoogle = false, googleToken = null) => {
    try {
      let response;
      if (isGoogle && googleToken) {
        // Google client-side login: Use provided token
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser) throw new Error("No Google user data found");
        response = { data: { user: storedUser, token: googleToken } };
      } else if (!isGoogle) {
        // Traditional login with email and password
        response = await axios.post(`${API_URL}/auth/login`, { email, password });
      } else {
        throw new Error("Invalid login parameters for Google authentication");
      }

      const { user, token } = response.data;
      setUser(user);
      setToken(token);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      toast.success(`Successfully logged in${isGoogle ? " with Google" : ""}!`);
      navigate("/products");
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Login failed";
      toast.error(message);
      throw error;
    }
  };

  const signup = async (name, email, password, isGoogle = false) => {
    try {
      let response;
      if (isGoogle) {
        // Google signup: Use existing token and user from localStorage
        const storedToken = localStorage.getItem("token");
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedToken || !storedUser) throw new Error("No Google authentication data found");
        response = { data: { user: storedUser, token: storedToken } };
      } else {
        // Traditional signup with name, email, and password
        response = await axios.post(`${API_URL}/auth/signup`, { name, email, password });
      }

      const { user, token } = response.data;
      setUser(user);
      setToken(token);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      toast.success(`Successfully registered${isGoogle ? " with Google" : ""}!`);
      navigate("/products");
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Signup failed";
      toast.error(message);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, signup, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);