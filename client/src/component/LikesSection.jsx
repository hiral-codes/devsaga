import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import toast from "react-hot-toast";

export default function LikesSection() {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [blog, setBlog] = useState(null);
  const { blogId } = useParams();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setUser(user);
      setUserId(user._id);
    }
  }, []);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await api.get(`/get-blogs/${blogId}`);
        setBlog(response.data);
        setLiked(response.data.likes.some((like) => like.likedBy === userId));
      } catch (error) {
        console.error("Error fetching the blog:", error);
      }
    };
    if (userId) {
      fetchBlog();
    }
  }, [blogId, userId]);

  const handleLike = async () => {
    if (liked) return;

    try {
      const response = await api.patch("/blog/like", { blogId, userId });
      setBlog(response.data.blog);
      setLiked(true);
      toast.success("❤️ Liked");
    } catch (error) {
      console.error("Error liking the blog:", error);
    }
  };

  const handleUnlike = async () => {
    if (!liked) return;

    try {
      const response = await api.patch("/blog/unlike", { blogId, userId });
      setBlog(response.data.blog);
      setLiked(false);
      toast.success("Like Removed");
    } catch (error) {
      console.error("Error unliking the blog:", error);
    }
  };

  return (
    <div className="flex justify-end p-8">
      <button onClick={liked ? handleUnlike : handleLike}>
        {liked ? "Liked" : "Like"} <br />
        <span></span>
      </button>
    </div>
  );
}
