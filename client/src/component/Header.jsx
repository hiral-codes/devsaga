import React, { useContext, useEffect, useState } from "react";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
export default function Header() {
  const [isOpen,setisOpen]=useState(false)
  const { logout, user } = useContext(AuthContext);
  const handleLogout = () => {
    logout();
  };
  return (
    <div className="h-14 flex items-center shadow-sm justify-between px-20 border-b fixed top-0 left-0 right-0 bg-white">
      <Link to="/" className="logo font-extrabold text-xl">DevSaga</Link>
      {user ? (
        <div className="flex items-center gap-4">
          <button className="p-2 bg-none border font-semibold hover:underline ease-in border-blue-600 rounded-lg text-blue-600 hover:bg-blue-600 hover:border-none hover:text-white">
            Create Post
          </button>
          <button className="text-3xl">
            <IoNotificationsCircleOutline />
          </button>
          <button
            onClick={() => {
              setisOpen(!isOpen);
            }}
            className="relative"
          >
            {isOpen && (
              <div className="submenu absolute top-12 right-4 p-4 shadow-xl border rounded-md bg-white">
                <ul>
                  <li className="flex items-center text-nowrap gap-2 p-1 my-1 hover:bg-purple-100 w-full rounded-md">
                    <span>👤</span>Profile
                  </li>
                  <li className="flex items-center text-nowrap gap-2 p-1 my-1 hover:bg-purple-100 w-full rounded-md">
                    <span>📃</span>Reading List
                  </li>
                  <li className="flex items-center text-nowrap gap-2 p-1 my-1 hover:bg-purple-100 w-full rounded-md">
                    <span>📝</span>Create Post
                  </li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center text-nowrap gap-2 p-1 my-1 hover:bg-purple-100 w-full rounded-md"
                  >
                    <span>😪</span>Logout
                  </button>
                </ul>
              </div>
            )}
            <img src={user.image} alt="" className="w-8 h-8 rounded-full" />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Link
            to="/auth/login"
            className="font-semibold text-gray-800 hover:text-blue-600"
          >
            Login
          </Link>
          <Link
            to="/auth/signup"
            className="p-2 bg-none ring-1 hover:underline text-blue-600 font-semibold ease-in rounded-lg hover:bg-blue-600 hover:text-white"
          >
            Create Account
          </Link>
        </div>
      )}
    </div>
  );
}
