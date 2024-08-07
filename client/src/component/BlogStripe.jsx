import React from "react";
import { format } from "date-fns";
export default function Blog({
  title,
  createdAt,
  firstName,
  lastName,
  avatar,
  tags,
  likes,
  comment,
}) {
  return (
    <div className="w-full shadow-sm border rounded-md p-4 bg-white overflow-hidden">
      <div className="flex items-center gap-2">
        <img
          src={avatar || "/hiral.jpg"}
          alt=""
          className="h-8 w-8 overflow-hidden rounded-full object-cover"
        />
        <div>
          <div className="font-semibold">
            {firstName || "Hiral"} {lastName || "Patel"}
          </div>
          <div className="text-xs">{format(new Date(createdAt), "MMM d")}</div>
        </div>
      </div>
      <div className="px-10">
        <h1 className="text-xl md:text-3xl font-semibold py-2 hover:text-blue-700">
          {title}
        </h1>
        {tags && (
          <div className="flex items-center gap-2 py-4">
            {tags.map((tag, tagId) => {
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
        <div className="flex gap-4 text-gray-600">
          <span>❤️{likes || 0} Like</span>
          <span>🗨️ {comment || 0} Comments</span>
        </div>
      </div>
    </div>
  );
}
