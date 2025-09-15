import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// This component protects routes from unauthenticated users
const PrivateRoute = () => {
  // Get token from local storage
  const token = localStorage.getItem("token");

  // If token exists, show the protected page
  // If not, redirect to login page
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
