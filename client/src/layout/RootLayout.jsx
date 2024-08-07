import React from "react";
import Header from "./Header";
import FeedController from "./FeedController";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <React.Fragment>
      <Header />
      <div className="grid grid-cols-12">
        <div className="col-span-3">1</div>
        <div className="col-span-6 pt-14">
          <FeedController />
          <div>
            <Outlet />
          </div>
        </div>
        <div className="col-span-3">3</div>
      </div>
    </React.Fragment>
  );
}
