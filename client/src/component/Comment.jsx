import React from "react";
import { format } from "date-fns";
export default function Comment({
  createdAt,
  firstName,
  lastName,
  avatar,
  comment,
}) {
  return (
    <div className="mt-2 border rounded-md p-4">
      <div className="flex items-center gap-2">
        <img
          src={avatar}
          alt="avatar"
          className="h-8 w-8 overflow-hidden rounded-full object-cover"
        />
        <div>
          <div className="font-bold text-sm text-gray-600">
            {firstName} {lastName}
          </div>
          <div className="text-xs text-gray-500">{format(new Date(createdAt), "MMM d, HH:mm")}</div>
        </div>
      </div>
      <div className="pl-10">{comment}</div>
    </div>
  );
}
