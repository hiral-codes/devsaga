import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Feed from "./pages/Feed";
import RootLayout from "./layout/RootLayout";
import Latest from "./pages/Latest";
import Top from "./pages/Top";
import BlogLayout from "./layout/BlogLayout";
import Blog from "./pages/Blog";
import Profile from "./component/AuthorProfile";
import Login from "./component/Login";
import AuthLayout from "./layout/AuthLayout";
import SignUp from "./component/SignUp";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Root Layout */}
        <Route path="/" element={<RootLayout />}>
          <Route path="" element={<Feed />} />
          <Route path="latest" element={<Latest />} />
          <Route path="top" element={<Top />} />
        </Route>
        {/* Auth Layout */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
        {/* Blogs Layout */}
        <Route
          path="/:username/:blogId"
          element={
            <BlogLayout profile={<Profile />}>
              <Blog />
            </BlogLayout>
          }
        />
        
      </Routes>
      <Toaster position="top-center" />
    </BrowserRouter>
  );
}
