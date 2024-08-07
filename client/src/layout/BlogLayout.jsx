import React from "react";

export default function BlogLayout({ children, profile }) {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2">LikeSection</div>
      <div className="col-span-7">{children}</div>
      <div className="col-span-3">{profile}</div>
    </div>
  );
}
