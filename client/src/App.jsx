import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import Feed from "./pages/Feed";
import RootLayout from "./layout/RootLayout";
import Latest from "./pages/Latest";
import Top from "./pages/Top";
import BlogLayout from "./layout/BlogLayout";
import Blog from "./pages/Blog";
import Profile from "./component/Profile";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route path="" element={<Feed />} />
            <Route path="latest" element={<Latest />} />
            <Route path="top" element={<Top />} />
          </Route>
          <Route
            path="/:username/:blogId"
            element={<BlogLayout children={<Blog />} profile={<Profile />} />}
          />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </AuthProvider>
  );
}
