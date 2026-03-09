import React from "react";
import { Navigate, useLocation } from "react-router-dom";

/**
 * Wraps any route that requires authentication.
 * Checks for a valid JWT token saved after login.
 * If missing, redirects to /auth, preserving the intended destination.
 */
const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem("ecotrack_token");

  if (!token) {
    return <Navigate to="/auth" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default ProtectedRoute;

