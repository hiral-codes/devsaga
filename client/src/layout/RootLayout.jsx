import React, { useEffect, useState } from "react";
import Header from "../component/Header";
import FeedController from "../component/FeedController";
import { Outlet } from "react-router-dom";
import Sidebar from "../component/Sidebar";
import api from "../utils/api";
import { Link } from "react-router-dom";
export default function RootLayout() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getBlogs = async () => {
    try {
      const response = await api.get(`/get-blogs`);
      const data = response.data;
      const activeBlogs = data.filter((blog) => blog.comments.length > 5);
      setBlogs(activeBlogs);
      setLoading(false);
    } catch (error) {
      setError("Failed to load active discussions.");
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <React.Fragment>
      <Header />
      <div className="grid grid-cols-12 pt-14">
        <div className="md:col-span-3 px-20 py-4 flex flex-col">
          <Sidebar />
        </div>
        <div className="col-span-6">
          <FeedController />
          <div>
            <Outlet />
          </div>
        </div>
        <div className="col-span-3 p-4">
          <div className="bg-white rounded-md border">
            <div className="font-bold text-xl text-gray-700 p-4">
              Active Discussions
            </div>
            {loading ? (
              <div className="p-4 text-gray-600">Loading...</div>
            ) : error ? (
              <div className="p-4 text-red-600">{error}</div>
            ) : blogs.length > 0 ? (
              blogs.map((blog) => (
                <div key={blog._id} className="border-t p-4">
                  <Link
                    to={`${blog.author.username}/${blog._id}`}
                    className="text-gray-600 hover:text-blue-600"
                  >
                    {blog.title}
                  </Link>
                  <div className="py-1 text-gray-600">
                    {blog.comments.length} Comments
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-gray-600">
                No active discussions found.
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
