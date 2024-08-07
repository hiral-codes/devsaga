import React from "react";
import Header from "./Header";

export default function BlogLayout({ children, profile }) {
  return (
    <React.Fragment>
      <Header />
      <div className="grid grid-cols-12 pt-20">
        <div className="col-span-2">LikeSection</div>
        <div className="col-span-7">{children}</div>
        <div className="col-span-3 px-4">{profile}</div>
      </div>
    </React.Fragment>
  );
}
