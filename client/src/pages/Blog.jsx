import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import { format } from "date-fns/format";
import { AuthContext } from "../context/AuthContext";
import Comment from "../component/Comment";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import toast from "react-hot-toast";

export default function Blog() {
  const { user } = useContext(AuthContext);
  const [blog, setBlog] = useState({});
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const { blogId, username } = useParams();

  const getBlog = async () => {
    try {
      const response = await api.get(`/get-blogs/${username}/${blogId}`);
      setBlog(response.data);
      if (user) {
        setLiked(response.data.likes.some((like) => like.likedBy === user._id));
      }
      setLoading(false);
      console.log("Api Called");
    } catch (error) {
      console.log("error:", error);
    }
  };

  useEffect(() => {
    getBlog();
  }, [blogId]);

  const handleLike = async () => {
    if (liked) return;
    try {
      await api.patch("/blog/like", {
        blogId,
        userId: user._id,
      });
      setLiked(true);
      await getBlog();
    } catch (error) {
      toast.error("Please Login");
    }
  };

  const handleUnlike = async () => {
    if (!liked) return;
    try {
      await api.patch("/blog/unlike", {
        blogId,
        userId: user._id,
      });
      setLiked(false);
      await getBlog();
    } catch (error) {
      toast.error("Please Login");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.patch("/blog/add-comment", {
        blogId,
        userId: user._id,
        comment,
      });
      setComment("");
      await getBlog();
    } catch (error) {
      toast.error("Please Login");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white p-12 rounded-md border">
      {blog.banner && (
        <img src={blog.banner} alt="" className="rounded-md mb-8" />
      )}
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
          <div className="text-xs text-gray-500">
            {format(new Date(blog.createdAt), "MMM d, HH:mm")}
          </div>
        </div>
      </div>
      <h1 className="text-4xl font-extrabold py-2">{blog.title}</h1>
      {blog.tags && (
        <div className="flex items-center gap-2 pb-2">
          {blog.tags.map((tag, tagId) => (
            <div key={tagId} className="text-gray-400">
              <div>#{tag}</div>
            </div>
          ))}
        </div>
      )}
      <div className="text-2xl p-4 rounded-md border">{blog.content}</div>

      <div className="flex items-center gap-6 py-4">
        <button onClick={liked ? handleUnlike : handleLike}>
          {liked ? (
            <FaHeart className="text-2xl text-red-600" />
          ) : (
            <FaRegHeart className="text-2xl" />
          )}
        </button>
        <button>
          <img src="/share.svg" alt="" />
        </button>
        <button>
          <img src="/save.svg" alt="" />
        </button>
      </div>
      <div className="pb-4"> {blog.likes.length} Likes</div>
      <div className="my-">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="p-2 border rounded-md outline-none"
            value={comment}
            placeholder="Add Comment"
            onChange={(e) => setComment(e.target.value)}
          />
          {comment.length > 0 && (
            <button
              type="submit"
              className="p-2 bg-blue-600 ml-4 rounded-md font-semibold text-white"
            >
              Comment
            </button>
          )}
        </form>
      </div>
      <div className="mt-4">
        <h1 className="pt-6 font-bold text-xl">Comments</h1>
        <div>
          {blog.comments
            .slice()
            .reverse()
            .map((comment) => (
              <Comment
                key={comment._id}
                avatar={comment.commentBy.image}
                createdAt={comment.createdAt}
                firstName={comment.commentBy.firstName}
                lastName={comment.commentBy.lastName}
                comment={comment.comment}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
