import React from "react";
import { useLocation, Link } from "react-router-dom";

export default function FeedController() {
  const location = useLocation();

  return (
    <div className="flex items-center gap-4 py-4">
      <Link
        className={`text-lg hover:bg-white hover:text-blue-500 rounded-md p-2 ${
          location.pathname === "/" ? "font-extrabold" : ""
        }`}
        to="/"
      >
        Relevant
      </Link>
      <Link
        className={`text-lg hover:bg-white hover:text-blue-500 rounded-md p-2 ${
          location.pathname === "/latest" ? "font-extrabold" : ""
        }`}
        to="/latest"
      >
        Latest
      </Link>
      <Link
        className={`text-lg hover:bg-white hover:text-blue-500 rounded-md p-2 ${
          location.pathname === "/top" ? "font-extrabold" : ""
        }`}
        to="/top"
      >
        Top
      </Link>
    </div>
  );
}
