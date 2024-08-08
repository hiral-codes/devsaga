import React, { useEffect, useState } from "react";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
export default function Header() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <div className="h-14 flex items-center shadow-sm justify-between px-20 border-b fixed top-0 left-0 right-0 bg-white">
      <div className="logo font-extrabold text-xl">DevSaga</div>
      {user ? (
        <div className="flex items-center gap-4">
          <button className="p-2 bg-none border font-semibold hover:underline ease-in border-blue-600 rounded-lg text-blue-600 hover:bg-blue-600 hover:border-none hover:text-white">
            Create Post
          </button>
          <button className="text-3xl">
            <IoNotificationsCircleOutline />
          </button>
          <button>
            <img src={user.image} alt="" className="w-8 h-8 rounded-full" />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Link to="/auth/signup" className="p-2 bg-none border font-semibold hover:underline ease-in border-blue-600 rounded-lg text-blue-600 hover:bg-blue-600 hover:border-none hover:text-white">
            Create Account
          </Link>
          <Link to="/auth/login" className="p-2 bg-none border font-semibold ease-in rounded-lg bg-blue-600 text-white">
            Login
          </Link>
        </div>
      )}
    </div>
  );
}
