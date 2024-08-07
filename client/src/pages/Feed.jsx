import React, { useEffect, useState } from "react";
import api from "../utils/api";
import Blog from "../component/Blog";
import { Link } from "react-router-dom";
export default function Feed() {
  const [blogs, setBlogs] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await api.get("/get-blogs");
        setBlogs(response.data);
        console.log(response.data);
        setLoading(false);
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
        <Link to={`${blog.author.username}/${blog._id}`}>
          <Blog
            key={blog._id}
            firstName={blog.author.firstName}
            lastName={blog.author.lastName}
            avatar={blog.author.image}
            title={blog.title}
            content={blog.content}
            createdAt={blog.createdAt}
            comments={blog.comments}
          />
        </Link>
      ))}
    </div>
  );
}
