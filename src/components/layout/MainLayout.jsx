import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
function MainLayout() {
  return (
    <div>
      <div className="font-inter ">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}

export default MainLayout;
