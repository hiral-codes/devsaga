import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import { format } from "date-fns/format";
export default function Blog() {
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const { blogId, username } = useParams();
  useEffect(() => {
    const getBlog = async () => {
      try {
        const response = await api.get(`/get-blogs/${username}/${blogId}`);
        setBlog(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.log("error:", error);
      }
    };
    getBlog();
  }, [blogId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white p-12 rounded-md border">
      <div className="flex items-center gap-2">
        <img
          src={blog.author.image || "/hiral.jpg"}
          alt=""
          className="h-8 w-8 overflow-hidden rounded-full object-cover"
        />
        <div>
          <div className="font-semibold">
            {blog.author.firstName || "Hiral"} {blog.author.lastName || "Patel"}
          </div>
          <div className="text-xs">
            {format(new Date(blog.createdAt), "MMM d")}
          </div>
        </div>
      </div>
      <img src={blog.banner} alt="" className="w-full h-full" />
      <h1 className="text-4xl font-extrabold py-2">{blog.title}</h1>
      {blog.tags && (
          <div className="flex items-center gap-2 py-4">
            {blog.tags.map((tag, tagId) => {
              return (
                <div key={tagId}>
                  <div className="rounded-3xl border bg-white w-fit px-2">
                    <div>#{tag}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div className="text-2xl py-4">{blog.content}</div>
        <div className="border-t">
            <h1 className="pt-6 font-bold text-xl">Comments</h1>
        </div>
    </div>
  );
}
