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
    return <div>Loading...</div>;
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
