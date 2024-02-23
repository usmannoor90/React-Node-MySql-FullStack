import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <div className="min-h-screen w-full max-w-[1200px] mx-auto px-4">
      <Header />
      <div className="mt-[6rem] ml-[250px] px-4 ">
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
