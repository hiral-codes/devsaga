import React from "react";
import { AiFillInstagram } from "react-icons/ai";
import { BiHome } from "react-icons/bi";
import {
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitterX,
  BsX,
  BsXCircle,
  BsXCircleFill,
} from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { FiXCircle } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div>
      <Link className="flex items-center gap-2 text-base p-2 hover:bg-indigo-100 rounded-md">
        <div>🏠</div>
        <span>Home</span>
      </Link>
      <Link className="flex items-center gap-2 text-base p-2 hover:bg-indigo-100 rounded-md">
        <div>📃</div>
        <span>Reading List</span>
      </Link>
      <Link className="flex items-center gap-2 text-base p-2 hover:bg-indigo-100 rounded-md">
        <div>📺</div>
        <span>Videos</span>
      </Link>
      <Link className="flex items-center gap-2 text-base p-2 hover:bg-indigo-100 rounded-md">
        <div>🏷️</div>
        <span>Tags</span>
      </Link>
      <Link className="flex items-center gap-2 text-base p-2 hover:bg-indigo-100 rounded-md">
        <div>ℹ️</div>
        <span>About Us</span>
      </Link>
      <Link className="flex items-center gap-2 text-base p-2 hover:bg-indigo-100 rounded-md">
        <div>🤗</div>
        <span>Contact Us</span>
      </Link>
      <Link className="flex items-center gap-2 text-base p-2 hover:bg-indigo-100 rounded-md">
        <div>📖</div>
        <span>Guides</span>
      </Link>
      <div>
        <div className="text-base font-bold p-2">Others</div>
      </div>
      <Link className="flex items-center gap-2 text-base p-2 hover:bg-indigo-100 rounded-md">
        <div>🧐</div>
        <span>Privacy Policy</span>
      </Link>
      <Link className="flex items-center gap-2 text-base p-2 hover:bg-indigo-100 rounded-md">
        <div>🤫</div>
        <span>Terms of use</span>
      </Link>
      <div className="flex items-center gap-4 py-8 p-2 text-xl">
        <a
          href=""
          target="_blank"
          className="p-2 rounded-md hover:bg-purple-200 hover:text-blue-600"
        >
          <BsTwitterX />
        </a>
        <a
          href=""
          target="_blank"
          className="p-2 rounded-md hover:bg-purple-200 hover:text-blue-600"
        >
          <BsFacebook />
        </a>
        <a
          href=""
          target="_blank"
          className="p-2 rounded-md hover:bg-purple-200 hover:text-blue-600"
        >
          <FaGithub />
        </a>
        <a
          href=""
          target="_blank"
          className="p-2 rounded-md hover:bg-purple-200 hover:text-blue-600"
        >
          <BsInstagram />
        </a>
      </div>
      <div className="px-4">DevSaga ©️ 2024 - 25</div>
    </div>
  );
}
