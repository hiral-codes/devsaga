import React, { useState } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";

export default function AddComment({ blogId, userId, comment,onChange }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.patch("/blog/add-comment", { blogId, userId, comment });
      toast.success("Comment Added");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="p-2 border rounded-md"
          placeholder="Write Comment"
        />
        <button
          type="submit"
          value={comment}
          onChange={onChange}
          className="p-2 bg-blue-600 ml-4 rounded-md font-semibold text-white"
        >
          Comment
        </button>
      </form>
    </div>
  );
}
