import { createContext, useEffect, useState } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const login = async ({ username, password }, navigate) => {
    try {
      const response = await api.post("/auth/login", { username, password });
      const data = response.data;
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success("Login Success")
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
      localStorage.removeItem("user");
      setUser(null);
      toast.success("Logged Out");
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  }; 

  return (
    <AuthContext.Provider value={{ login, user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
