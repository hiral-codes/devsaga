import React from "react";
import Header from "../component/Header";

export default function BlogLayout({ children, profile }) {
  return (
    <React.Fragment>
      <Header />
      <div className="grid grid-cols-12 pt-20">
        <div className="col-span-2 px-4">
        <div className="border bg-white p-4 rounded-md">
        <h1 className="text-sm text-gray-400">Sponsored</h1>

          <img src="/sponsor.png" className="rounded-md"/>
        </div>
        </div>
        <div className="col-span-7">{children}</div>
        <div className="col-span-3 px-4 pb-10">{profile}</div>
      </div>
    </React.Fragment>
  );
}
