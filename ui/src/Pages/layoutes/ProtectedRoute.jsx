import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const { token } = useSelector((state) => state.auth);
  let auth = false;

  if (token !== undefined && token !== null) {
    auth = true;
  } else {
    auth = false;
  }

  return !auth ? <Outlet /> : <Navigate to={"/"} replace />;
}

export default ProtectedRoute;
