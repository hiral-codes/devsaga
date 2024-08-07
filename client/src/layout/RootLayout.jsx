import React from "react";
import Header from "./Header";
import FeedController from "../component/FeedController";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function RootLayout() {
  return (
    <React.Fragment>
      <Header />
      <div className="grid grid-cols-12 pt-14">
        <div className="md:col-span-3 px-20 py-4 flex flex-col">
          <Sidebar />
        </div>
        <div className="col-span-6">
          <FeedController />
          <div>
            <Outlet />
          </div>
        </div>
        <div className="col-span-3 p-4">
          <div className="bg-white rounded-md border">
            <div className="font-bold text-xl text-gray-700 p-4">Active Descussions</div>
            <div className="border-t p-4">
              <span className="text-gray-600 hover:text-blue-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. In est animi quia?</span>
              <div className="py-1 text-gray-600">22 comments</div>
            </div>
            <div className="border-t p-4">
              <span className="text-gray-600 hover:text-blue-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. In est animi quia?</span>
              <div className="py-1 text-gray-600">22 comments</div>
            </div>
            <div className="border-t p-4">
              <span className="text-gray-600 hover:text-blue-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. In est animi quia?</span>
              <div className="py-1 text-gray-600">22 comments</div>
            </div>
            <div className="border-t p-4">
              <span className="text-gray-600 hover:text-blue-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. In est animi quia?</span>
              <div className="py-1 text-gray-600">22 comments</div>
            </div>
            <div className="border-t p-4">
              <span className="text-gray-600 hover:text-blue-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. In est animi quia?</span>
              <div className="py-1 text-gray-600">22 comments</div>
            </div>
            <div className="border-t p-4">
              <span className="text-gray-600 hover:text-blue-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. In est animi quia?</span>
              <div className="py-1 text-gray-600">22 comments</div>
            </div>
            <div className="border-t p-4">
              <span className="text-gray-600 hover:text-blue-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. In est animi quia?</span>
              <div className="py-1 text-gray-600">22 comments</div>
            </div>
            <div className="border-t p-4">
              <span className="text-gray-600 hover:text-blue-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. In est animi quia?</span>
              <div className="py-1 text-gray-600">22 comments</div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
