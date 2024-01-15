import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

function AccountLayout() {
  return (
    <div className="min-h-screen w-full max-w-[1200px] mx-auto px-4">
      <Header />
      <div className="mt-[3rem]">
        <Outlet />
      </div>
    </div>
  );
}

export default AccountLayout;
