import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
function MainLayout() {
  return (
    <div>
      <div className="font-inter ">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
