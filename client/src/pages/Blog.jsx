import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import { format } from "date-fns/format";
import { AuthContext } from "../context/AuthContext";
import { IoHeartOutline } from "react-icons/io5";
import { BsHeartFill } from "react-icons/bs";
import { BiCommentEdit } from "react-icons/bi";
import Comment from "../component/Comment";
import toast from "react-hot-toast";
export default function Blog() {
  const { user } = useContext(AuthContext);
  const [blog, setBlog] = useState({});
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const { blogId, username } = useParams();

  useEffect(() => {
    const getBlog = async () => {
      try {
        const response = await api.get(`/get-blogs/${username}/${blogId}`);
        setBlog(response.data);
        setLiked(response.data.likes.some((like) => like.likedBy === user._id));
        setLoading(false);
        console.log(response.data);
      } catch (error) {
        console.log("error:", error);
      }
    };
    getBlog();
  }, [blogId, liked, comment]);

  const handleLike = async () => {
    if (liked) return;
    try {
      const response = await api.patch("/blog/like", {
        blogId,
        userId: user._id,
      });
      setLiked(true);
    } catch (error) {
      console.error("Error liking the blog:", error);
    }
  };

  const handleUnlike = async () => {
    if (!liked) return;
    try {
      const response = await api.patch("/blog/unlike", {
        blogId,
        userId: user._id,
      });
      setLiked(false);
    } catch (error) {
      console.error("Error unliking the blog:", error);
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
      toast.success("Comment Added");
    } catch (error) {
      console.log(error);
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
          <div className="text-xs">
            {format(new Date(blog.createdAt), "MMM d")}
          </div>
        </div>
      </div>
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

      <div className="flex items-center gap-4 border-t pt-4">
        <div className="text-center">
          <button onClick={liked ? handleUnlike : handleLike}>
            {liked ? (
              <BsHeartFill className="text-xl text-red-600" />
            ) : (
              <IoHeartOutline className="text-2xl" />
            )}
          </button>
          <br />
          {blog.likes.length} Like
        </div>
        <div className="text-center">
          <button>
            <BiCommentEdit className="text-2xl" />
          </button>
          <br />
          {blog.comments.length} Comments
        </div>
      </div>
      <div className="my-12">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="p-2 border rounded-md"
            value={comment}
            placeholder="Write Comment"
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <button
            type="submit"
            className="p-2 bg-blue-600 ml-4 rounded-md font-semibold text-white"
          >
            Comment
          </button>
        </form>
      </div>
      <div className="border-t mt-4">
        <h1 className="pt-6 font-bold text-xl">Comments</h1>
        <div>
          {blog.comments
            .slice()
            .reverse()
            .map((comment) => {
              return (
                <Comment
                  key={comment._id} // Assuming comment._id is unique
                  avatar={comment.commentBy.image}
                  createdAt={comment.createdAt}
                  firstName={comment.commentBy.firstName}
                  lastName={comment.commentBy.lastName}
                  comment={comment.comment}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
