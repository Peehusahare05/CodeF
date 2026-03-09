// Navbar.jsx
import React from "react";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md py-4 px-6 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="inline-block w-8 h-8 bg-gradient-to-tr from-green-500 to-green-400 rounded-full flex items-center justify-center text-white font-bold text-xl">
          🌱
        </span>
        <span className="font-extrabold text-2xl text-green-700 tracking-tight">
          EcoTrack
        </span>
      </div>
      <div className="hidden md:flex gap-8 text-slate-700 font-medium">
        <a href="#home" className="hover:text-green-600 transition">
          Home
        </a>
        <a href="#how" className="hover:text-green-600 transition">
          How It Works
        </a>
        <a href="#features" className="hover:text-green-600 transition">
          Features
        </a>
        <a href="#leaderboard" className="hover:text-green-600 transition">
          Leaderboard
        </a>
        <a href="#about" className="hover:text-green-600 transition">
          About
        </a>
      </div>
      <div>
        <button className="rounded-full bg-green-600 hover:bg-green-700 text-white px-6 py-2 font-semibold shadow transition">
          Start Tracking
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
