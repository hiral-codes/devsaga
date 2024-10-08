import { createContext, useEffect, useState } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = async ({ username, password }, navigate) => {
    try {
      const response = await api.post("/auth/login", { username, password });
      const data = response.data;
      setUser(data.user);
      toast.success("Login Success");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
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
