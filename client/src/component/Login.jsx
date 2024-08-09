import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ username, password }, navigate);
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="p-4 bg-white rounded-md border min-w-80">
        <h1 className="text-xl font-bold">Login</h1>
        <div className="my-4">
          <input
            type="text"
            placeholder="username"
            className="w-full p-2 border rounded-md outline-none"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="my-4">
          <input
            type="password"
            placeholder="password"
            className="w-full p-2 border rounded-md outline-none"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button type="submit" className="w-full rounded-md bg-blue-600 p-2 font-bold text-white">Login</button>
      </form>
    </div>
  );
}
