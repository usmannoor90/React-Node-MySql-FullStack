import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

function AccountLayout() {
  return (
    <div className="min-h-screen w-full max-w-[1200px] mx-auto">
      <Header />
      <Outlet />
    </div>
  );
}

export default AccountLayout;
