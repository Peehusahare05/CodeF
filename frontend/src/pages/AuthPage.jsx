import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

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
    if (form.password.length < 6) e.password = "Password must be at least 6 characters.";
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
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setLoading(true);
    setServerError("");

    try {
      const endpoint = mode === "register" ? `${API}/register` : `${API}/login`;
      const body = mode === "register"
        ? { name: form.name, email: form.email, password: form.password }
        : { email: form.email, password: form.password };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError(data.message || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      // Save JWT token and user info in localStorage
      localStorage.setItem("ecotrack_token", data.token);
      localStorage.setItem("ecotrack_user", JSON.stringify(data.user));

      navigate(from);
    } catch (err) {
      setServerError("Cannot connect to server. Make sure the backend is running on port 5000.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8 cursor-pointer" onClick={() => navigate("/")}>
        <span className="w-10 h-10 bg-gradient-to-tr from-green-500 to-green-400 rounded-full flex items-center justify-center text-white text-2xl shadow">
          🌱
        </span>
        <span className="font-extrabold text-3xl text-green-700 tracking-tight">EcoTrack</span>
      </div>

      {/* Card */}
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8">
        {/* Tabs */}
        <div className="flex bg-slate-100 rounded-xl p-1 mb-7">
          {["login", "register"].map((tab) => (
            <button
              key={tab}
              onClick={() => { setMode(tab); setErrors({}); setServerError(""); }}
              className={`flex-1 py-2 rounded-lg font-semibold text-sm transition capitalize ${
                mode === tab
                  ? "bg-white text-green-700 shadow"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab === "login" ? "Sign In" : "Create Account"}
            </button>
          ))}
        </div>

        <h2 className="text-2xl font-extrabold text-slate-800 mb-1">
          {mode === "login" ? "Welcome back 👋" : "Join EcoTrack 🌿"}
        </h2>
        <p className="text-slate-400 text-sm mb-6">
          {mode === "login"
            ? "Sign in to track your carbon footprint."
            : "Create an account to start tracking your environmental impact."}
        </p>

        {/* Server error banner */}
        {serverError && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-4">
            ⚠️ {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          {/* Name — register only */}
          {mode === "register" && (
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Alex Johnson"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Minimum 6 characters"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-70 text-white font-bold py-3 rounded-2xl shadow-lg transition text-base mt-2"
          >
            {loading
              ? "Please wait..."
              : mode === "login" ? "Sign In →" : "Create Account →"}
          </button>
        </form>

        <p className="text-center text-slate-400 text-sm mt-5">
          {mode === "login" ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => { setMode(mode === "login" ? "register" : "login"); setErrors({}); setServerError(""); }}
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
