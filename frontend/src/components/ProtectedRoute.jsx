import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { apiFetch } from "../utils/api";

/**
 * Wraps any route that requires authentication.
 * Checks for a valid JWT token saved after login.
 * If missing, redirects to /auth, preserving the intended destination.
 */
const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    let mounted = true;

    apiFetch("/api/auth/me")
      .then((res) => {
        if (!mounted) return;
        setStatus(res.ok ? "allowed" : "blocked");
      })
      .catch(() => {
        if (!mounted) return;
        setStatus("blocked");
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (status === "checking") {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Checking session...
      </div>
    );
  }

  if (status !== "allowed") {
    return <Navigate to="/auth" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default ProtectedRoute;

