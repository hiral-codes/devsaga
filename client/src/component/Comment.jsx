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
    <div className="mt-8 border rounded-md p-4">
      <div className="flex items-center gap-2">
        <img
          src={avatar}
          alt="avatar"
          className="h-8 w-8 overflow-hidden rounded-full object-cover"
        />
        <div>
          <div className="font-semibold text-sm">
            {firstName} {lastName}
          </div>
          <div className="text-xs">{format(new Date(createdAt), "MMM d, HH:mm")}</div>
        </div>
      </div>
      <div className="pl-10">{comment}</div>
    </div>
  );
}
