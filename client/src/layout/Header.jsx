import React from "react";
import { IoNotificationsCircleOutline } from "react-icons/io5";

export default function Header() {
  return (
    <div className="h-14 flex items-center shadow-sm justify-between px-20 border-b fixed top-0 left-0 right-0 bg-white">
      <div className="logo font-extrabold text-xl">DevSaga</div>
      <div className="flex items-center gap-4">
        <button className="p-2 bg-none border font-semibold hover:underline ease-in border-blue-600 rounded-lg text-blue-600 hover:bg-blue-600 hover:border-none hover:text-white">
          Create Post
        </button>
        <button className="text-3xl">
          <IoNotificationsCircleOutline />
        </button>
        <button><img src="/hiral.jpg" alt="" className="w-8 h-8 rounded-full"/></button>
      </div>
    </div>
  );
}
