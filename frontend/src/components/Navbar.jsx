// Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("ecotrack_user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("ecotrack_token");
    localStorage.removeItem("ecotrack_user");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md py-4 px-6 flex items-center justify-between">
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
      <div className="hidden md:flex gap-8 text-slate-700 font-medium">
        <a href="#home" className="hover:text-green-600 transition">Home</a>
        <a href="#how" className="hover:text-green-600 transition">How It Works</a>
        <a href="#features" className="hover:text-green-600 transition">Features</a>
        <a href="#leaderboard" className="hover:text-green-600 transition">Leaderboard</a>
        <a href="#about" className="hover:text-green-600 transition">About</a>
      </div>

      {/* Right side — auth aware */}
      <div className="flex items-center gap-3">
        {user ? (
          <>
            {/* Logged in: show avatar + name + logout */}
            <Link
              to="/track"
              className="hidden md:inline-flex rounded-full border border-green-600 text-green-700 px-4 py-1.5 text-sm font-semibold hover:bg-green-50 transition"
            >
              Track Now
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-sm uppercase">
                {user.name ? user.name[0] : "U"}
              </div>
              <span className="hidden md:block text-slate-700 text-sm font-medium">
                {user.name || user.email}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="rounded-full bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-500 px-4 py-1.5 text-sm font-semibold transition"
            >
              Logout
            </button>
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
