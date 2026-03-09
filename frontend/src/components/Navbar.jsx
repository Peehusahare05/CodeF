// Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("ecotrack_user");
    return stored ? JSON.parse(stored) : null;
  });

  const handleLogout = () => {
    localStorage.removeItem("ecotrack_token");
    localStorage.removeItem("ecotrack_user");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100 py-4 px-6 md:px-12 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <span className="inline-block w-8 h-8 bg-gradient-to-tr from-green-500 to-green-400 rounded-full flex items-center justify-center text-white font-bold text-xl">
          🌱
        </span>
        <span className="font-extrabold text-2xl text-green-700 tracking-tight">
          EcoTrack
        </span>
      </Link>

      {/* Nav links */}
      <div className="hidden md:flex gap-10 text-slate-600 font-semibold text-sm tracking-wide">
        <a href="/#home" className="hover:text-green-600 transition">
          Home
        </a>
        <a href="/#how" className="hover:text-green-600 transition">
          How It Works
        </a>
        <a href="/#features" className="hover:text-green-600 transition">
          Features
        </a>
        <a href="/#leaderboard" className="hover:text-green-600 transition">
          Leaderboard
        </a>
        <Link to="/about" className="hover:text-green-600 transition">
          About
        </Link>
      </div>

      {/* Right side — auth aware */}
      <div className="flex items-center gap-3">
        {user ? (
          <>
            {/* Logged in: show avatar + name + logout */}
            <Link
              to="/track"
              className="hidden md:inline-flex items-center justify-center h-10 rounded-full border border-green-600 text-green-700 px-5 text-sm font-semibold hover:bg-green-50 transition"
            >
              Track Now
            </Link>
            
            <div className="flex items-center gap-4 ml-2">
              <Link to="/profile" className="flex items-center gap-2 hover:opacity-80 transition cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-sm uppercase shadow-sm">
                  {user.name ? user.name[0] : "U"}
                </div>
                <span className="hidden md:block text-slate-700 text-sm font-semibold">
                  {user.name || user.email}
                </span>
              </Link>
              
              <button
                onClick={handleLogout}
                className="flex items-center justify-center h-10 rounded-full bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-600 px-5 text-sm font-semibold transition"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Not logged in: Sign In + Start Tracking */}
            <Link
              to="/auth"
              className="text-slate-600 hover:text-green-600 font-semibold text-sm transition"
            >
              Sign In
            </Link>
            <Link
              to="/auth"
              className="rounded-full bg-green-600 hover:bg-green-700 text-white px-6 py-2 font-semibold shadow transition"
            >
              Start Tracking
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
