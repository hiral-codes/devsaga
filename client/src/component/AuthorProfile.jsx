import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import { format } from "date-fns";
import { Link } from "react-router-dom";
function Profile() {
  const { username } = useParams();
  const [author, setAuthor] = useState({});
  const [blogs, setBlogs] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingBlogs, setLoadingBlogs] = useState(true);

  useEffect(() => {
    const getAuthor = async () => {
      try {
        const response = await api.get(`/get-author/${username}`);
        setAuthor(response.data);
        setLoading(false);
      } catch (error) {
        console.log("error:", error);
      }
    };
    getAuthor();
  }, []);

  useEffect(() => {
    const getMoreBlog = async () => {
      try {
        const response = await api.get(`/get-blogs/${username}`);
        setBlogs(response.data);
        setLoadingBlogs(false);
      } catch (error) {
        console.log("error:", error);
      }
    };
    getMoreBlog();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (loadingBlogs) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white p-4 rounded-md border overflow-hidden">
      <div className="flex items-center justify-between rounded-md border p-4">
        <div className="flex items-center gap-2">
          <img
            src={author.image || "/hiral.jpg"}
            alt=""
            className="h-12 w-12 overflow-hidden rounded-full object-cover"
          />
          <div>
            <div className="font-semibold">
              {author.firstName} {author.lastName}
            </div>
            <div className="text-xs">{author.authorUsername}</div>
          </div>
        </div>
        <div className="font-semibold">{author.followersCount} Followers</div>
      </div>
      <div className="py-4">
        <button className="p-2 ring-1  ring-blue-600 w-full font-semibold text-blue-600 hover:bg-blue-600 hover:border-none hover:text-white rounded-md">
          Follow
        </button>
      </div>
      <div className="py-2">
        <span className="font-bold">Joined on</span>
        <div className="text-sm">
          {format(new Date(author.createdAt), "MMM d, yyyy")}
        </div>
      </div>
      <div className="py-2">
        <div className="font-bold">
          More from {author.firstName} {`(${blogs.length})`}
        </div>
        <div>
          {blogs.map((blog) => {
            return (
              <Link to={`/${username}/${blog._id}`} key={blog._id}>
                <div className="hover:text-blue-600 mt-4">{blog.title}</div>
                {blog.tags && (
                  <div className="flex items-center gap-2">
                    {blog.tags.map((tag) => {
                      return (
                        <span key={tag}>
                          <span className="w-fit text-gray-500">
                            <span>#{tag}</span>
                          </span>
                        </span>
                      );
                    })}
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Profile;
