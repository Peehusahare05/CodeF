// Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Leaf, Menu, X } from "lucide-react";
import { apiFetch } from "../utils/api";

const Navbar = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("ecotrack_user");    return stored ? JSON.parse(stored) : null;
  });

  const handleLogout = () => {
    apiFetch("/api/auth/logout", {
      method: "POST",
    }).finally(() => {
      localStorage.removeItem("ecotrack_user");
      setUser(null);
      setMobileMenuOpen(false);
      navigate("/");
    });
  };

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 px-4 py-3 md:px-6">
      <div className="section-wrap flex items-center justify-between px-0">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700">
            <Leaf className="icon-glyph-sm" />
          </span>
          <span className="text-lg font-bold tracking-tight text-green-700 sm:text-xl">
            EcoTrack
          </span>
        </Link>

        {/* Nav links */}
        <div className="hidden gap-8 text-sm font-medium text-slate-600 md:flex">
          <a href="/#home" className="transition-colors hover:text-green-600">
            Home
          </a>
          <a href="/#how" className="transition-colors hover:text-green-600">
            How It Works
          </a>
          <a
            href="/#features"
            className="transition-colors hover:text-green-600"
          >
            Features
          </a>
          <a
            href="/#leaderboard"
            className="transition-colors hover:text-green-600"
          >
            Leaderboard
          </a>
          <Link to="/about" className="transition-colors hover:text-green-600">
            About
          </Link>
        </div>

        {/* Right side — auth aware */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <Link
                to="/track"
                className="hidden rounded-full border border-green-600 px-5 py-2 text-sm font-semibold text-green-700 transition-colors hover:bg-green-50 md:inline-flex"
              >
                Track Now
              </Link>

              <div className="ml-2 flex items-center gap-4">
                <Link
                  to="/profile"
                  className="flex cursor-pointer items-center gap-2"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-sm font-bold uppercase text-white">
                    {user.name ? user.name[0] : "U"}
                  </div>
                  <span className="hidden text-sm font-semibold text-slate-700 md:block">
                    {user.name || user.email}
                  </span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="rounded-full bg-gray-100 px-5 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/auth"
                className="text-sm font-semibold text-slate-600 transition-colors hover:text-green-600"
              >
                Sign In
              </Link>
              <Link to="/auth" className="btn-primary">
                Start Tracking
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-slate-600 md:hidden"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="icon-glyph" /> : <Menu className="icon-glyph" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="section-wrap mt-3 rounded-2xl border border-gray-200 bg-white p-4 md:hidden">
          <div className="flex flex-col gap-3 text-sm font-medium text-slate-700">
            <a href="/#home" onClick={closeMenu} className="rounded-lg px-2 py-1 hover:bg-gray-50">
              Home
            </a>
            <a href="/#how" onClick={closeMenu} className="rounded-lg px-2 py-1 hover:bg-gray-50">
              How It Works
            </a>
            <a href="/#features" onClick={closeMenu} className="rounded-lg px-2 py-1 hover:bg-gray-50">
              Features
            </a>
            <a href="/#leaderboard" onClick={closeMenu} className="rounded-lg px-2 py-1 hover:bg-gray-50">
              Leaderboard
            </a>
            <Link to="/about" onClick={closeMenu} className="rounded-lg px-2 py-1 hover:bg-gray-50">
              About
            </Link>
          </div>

          <div className="mt-4 border-t border-gray-100 pt-4">
            {user ? (
              <div className="flex flex-col gap-3">
                <Link
                  to="/profile"
                  onClick={closeMenu}
                  className="inline-flex items-center gap-2 rounded-lg px-2 py-1"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-xs font-bold uppercase text-white">
                    {user.name ? user.name[0] : "U"}
                  </div>
                  <span className="truncate text-sm font-semibold text-slate-700">
                    {user.name || user.email}
                  </span>
                </Link>
                <Link
                  to="/track"
                  onClick={closeMenu}
                  className="btn-secondary w-full"
                >
                  Track Now
                </Link>
                <button onClick={handleLogout} className="btn-primary w-full">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link to="/auth" onClick={closeMenu} className="btn-secondary w-full">
                  Sign In
                </Link>
                <Link to="/auth" onClick={closeMenu} className="btn-primary w-full">
                  Start Tracking
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
