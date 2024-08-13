import React, { useEffect, useState } from "react";
import api from "../utils/api";
import Blog from "../component/BlogStripe";
import { Link } from "react-router-dom";
import BlogStripe from "../component/BlogStripe";
export default function Feed() {
  const [blogs, setBlogs] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await api.get("/get-blogs");
        setBlogs(response.data);
        setLoading(false);
        console.log(response.data);
      } catch (error) {
        console.log("error:", error);
      }
    };
    getBlogs();
  }, []);

  if (loading) {
    return (
      <div className="w-full shadow-sm border rounded-md p-4 bg-white overflow-hidden">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 overflow-hidden rounded-full object-cover bg-gray-300 animate-pulse"></div>
          <div className="">
            <div className="font-semibold h-10 bg-gray-300 rounded-md animate-pulse w-48"></div>
          </div>
        </div>
        <div className="px-10">
          <h1 className="text-xl md:text-3xl font-semibold py-2 hover:text-blue-700 h-4"></h1>
          <div className="flex items-center gap-2 py-4">
            <div>
              <div className="rounded-3xl border h-10 bg-gray-300 px-2">
                <div></div>
              </div>
            </div>
          </div>
          <div className="flex gap-4 text-gray-600">
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {blogs.map((blog) => (
        <Link to={`${blog.author.username}/${blog._id}`} key={blog._id}>
          <BlogStripe
            firstName={blog.author.firstName}
            lastName={blog.author.lastName}
            avatar={blog.author.image}
            tags={blog.tags}
            title={blog.title}
            createdAt={blog.createdAt}
            comment={blog.comments.length}
            likes={blog.likes.length}
          />
        </Link>
      ))}
    </div>
  );
}
