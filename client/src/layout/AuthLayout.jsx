import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../component/Header";

function AuthLayout() {
  return (
    <React.Fragment>
      <Header />
      <Outlet />
    </React.Fragment>
  );
}

export default AuthLayout;
