import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AlertTriangle, Leaf } from "lucide-react";
import { apiFetch } from "../utils/api";

const API = "/api/auth";

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mode, setMode] = useState("login"); // 'login' | 'register'
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect destination after login (default /track)
  const from = location.state?.from || "/track";

  const validate = () => {
    const e = {};
    if (mode === "register" && !form.name.trim()) e.name = "Name is required.";
    if (!form.email.includes("@")) e.email = "Enter a valid email.";
    if (form.password.length < 8)
      e.password = "Password must be at least 8 characters.";
    return e;
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    setServerError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    setServerError("");

    try {
      const endpoint = mode === "register" ? `${API}/register` : `${API}/login`;
      const body =
        mode === "register"
          ? { name: form.name, email: form.email, password: form.password }
          : { email: form.email, password: form.password };

      const res = await apiFetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError(
          data.message || "Something went wrong. Please try again.",
        );
        setLoading(false);
        return;
      }

      // Persist lightweight user context in localStorage; auth is handled by secure cookie
      localStorage.setItem("ecotrack_user", JSON.stringify(data.user));

      navigate(from);
    } catch {
      setServerError(
        "Cannot connect to server. Please check backend availability and network settings.",
      );
      setLoading(false);
    }
  };

  return (
    <div className="page-shell flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <div
        className="flex items-center gap-2 mb-8 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-700">
          <Leaf className="icon-glyph" />
        </span>
        <span className="font-extrabold text-3xl text-green-700 tracking-tight">
          EcoTrack
        </span>
      </div>

      {/* Card */}
      <div className="surface-card w-full max-w-md p-8">
        {/* Tabs */}
        <div className="mb-7 flex rounded-xl bg-slate-100 p-1">
          {["login", "register"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setMode(tab);
                setErrors({});
                setServerError("");
              }}
              className={`flex-1 rounded-lg py-2 text-sm font-semibold capitalize transition-colors ${mode === tab
                ? "bg-white text-green-700"
                : "text-slate-500 hover:text-slate-700"
                }`}
            >
              {tab === "login" ? "Sign In" : "Create Account"}
            </button>
          ))}
        </div>

        <h2 className="text-2xl font-extrabold text-slate-800 mb-1">
          {mode === "login" ? "Welcome back" : "Join EcoTrack"}
        </h2>
        <p className="text-slate-400 text-sm mb-6">
          {mode === "login"
            ? "Sign in to track your carbon footprint."
            : "Create an account to start tracking your environmental impact."}
        </p>

        {/* Server error banner */}
        {serverError && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-4 flex items-start gap-2">
            <AlertTriangle className="icon-glyph-sm mt-0.5 shrink-0" />
            <span>{serverError}</span>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
          noValidate
        >
          {/* Name — register only */}
          {mode === "register" && (
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Alex Johnson"
                className="input-control"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="input-control"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Minimum 8 characters"
              className="input-control"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-2xl bg-green-600 py-3 text-base font-semibold text-white transition-colors hover:bg-green-700 disabled:opacity-70"
          >
            {loading
              ? "Please wait..."
              : mode === "login"
                ? "Sign In →"
                : "Create Account →"}
          </button>
        </form>

        <p className="text-center text-slate-400 text-sm mt-5">
          {mode === "login"
            ? "Don't have an account? "
            : "Already have an account? "}
          <button
            onClick={() => {
              setMode(mode === "login" ? "register" : "login");
              setErrors({});
              setServerError("");
            }}
            className="text-green-600 font-semibold hover:underline"
          >
            {mode === "login" ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>

      <p className="text-slate-400 text-xs mt-6">
        © 2024 EcoTrack · Environmental Impact Tracker
      </p>
    </div>
  );
};

export default AuthPage;
