import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function SignUp() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname:"",
    lastname:""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ username, password }, navigate);
  };

  const handleChange = (e) => {
    console.log(e.target.name,e.target.value)
  };

  console.log(formData);

  return (
    <div className="h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-white rounded-md border min-w-80"
      >
        <h1 className="text-xl font-bold">Create an Account</h1>
        <div className="flex items-center gap-4">
          <div className="my-2">
            <input
              type="file"
              name="image"
              placeholder="Upload Profile"
              className="w-full p-2 border rounded-md outline-none"
              onChange={handleChange}
            />
          </div>
          <div className="my-2">
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              className="w-full p-2 border rounded-md outline-none"
              onChange={handleChange}
            />
          </div>
          <div className="my-2">
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              className="w-full p-2 border rounded-md outline-none"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="my-2">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full p-2 border rounded-md outline-none"
            onChange={handleChange}
          />
        </div>
        <div className="my-2">
          <input
            type="email"
            name="email"
            placeholder="email"
            className="w-full p-2 border rounded-md outline-none"
            onChange={handleChange}
          />
        </div>
        <div className="my-2">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-2 border rounded-md outline-none"
            onChange={handleChange}
          />
          <p className="text-blue-600 pt-2">Forget Password?</p>
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 p-2 font-bold text-white"
        >
          Create an Account
        </button>
        <div className="mx-auto w-fit mt-4">
          <Link to="/auth/login" className="mx-auto">
            Already have an Account?
          </Link>
        </div>
      </form>
    </div>
  );
}
