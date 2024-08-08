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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
