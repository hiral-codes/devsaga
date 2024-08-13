import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useRef } from "react";
export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ username, password }, navigate);
  };
  const handleInputPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-white rounded-md border min-w-80"
      >
        <h1 className="text-xl font-bold">Login</h1>
        <div className="my-2">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 border rounded-md outline-none"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="my-4 flex items-center gap-4">
        <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        className="w-full p-2 border rounded-md outline-none"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <span className="cursor-pointer" onClick={handleInputPassword}>
        {showPassword ? "🙈" : "👁️"}
      </span>
        </div>
          <p className="text-blue-600 pt-2">Forget Password?</p>
        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 p-2 font-bold text-white"
        >
          Login
        </button>
        <div className="mx-auto w-fit mt-4">
          <Link to="/auth/signup" className="mx-auto">
            Don't have an Account?
          </Link>
        </div>
      </form>
    </div>
  );
}
