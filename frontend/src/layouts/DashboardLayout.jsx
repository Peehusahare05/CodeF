import React from "react";
import { Leaf, LayoutDashboard, Sparkles, UserRound, LineChart, Calculator, Trophy, Brain } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import { apiFetch } from "../utils/api";

const DASHBOARD_NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/track", label: "Track", icon: Calculator },
  { to: "/suggestions", label: "Suggestions", icon: Sparkles },
  { to: "/ai-advisor", label: "AI Advisor", icon: Brain },
  { to: "/simulator", label: "Simulator", icon: LineChart },
  { to: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { to: "/profile", label: "Profile", icon: UserRound },
];

const navLinkClass = ({ isActive }) =>
  `flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${isActive
    ? "bg-green-100 text-green-800"
    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
  }`;

const DashboardLayout = () => {
  const handleLogout = () => {
    apiFetch("/api/auth/logout", {
      method: "POST",
    }).finally(() => {
      localStorage.removeItem("ecotrack_user");
      window.location.href = "/";
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-slate-200 bg-white px-4 py-6 md:flex md:flex-col">
          <NavLink to="/" className="mb-8 flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-green-700">
              <Leaf className="icon-glyph-sm" />
            </span>
            <span className="text-lg font-extrabold tracking-tight text-green-700">
              EcoTrack
            </span>
          </NavLink>

          <nav className="flex flex-col gap-1">
            {DASHBOARD_NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink key={item.to} to={item.to} className={navLinkClass} end={item.to === "/dashboard"}>
                  <Icon className="icon-glyph-sm" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-auto w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100"
          >
            Logout
          </button>
        </aside>

        <div className="flex min-h-screen flex-1 flex-col">
          <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur md:hidden">
            <div className="flex items-center justify-between">
              <NavLink to="/" className="flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700">
                  <Leaf className="icon-glyph-sm" />
                </span>
                <span className="text-base font-bold text-green-700">EcoTrack</span>
              </NavLink>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600"
              >
                Logout
              </button>
            </div>
            <nav className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {DASHBOARD_NAV_ITEMS.map((item) => (
                <NavLink key={item.to} to={item.to} className={navLinkClass} end={item.to === "/dashboard"}>
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </header>

          <main className="flex-1 p-4 md:p-6 lg:p-8">
            <div className="mx-auto w-full max-w-7xl">
              <NavLink
                to="/"
                className="mb-4 inline-flex items-center rounded-full border border-slate-200 px-4 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:bg-white"
              >
                Back to Public Site
              </NavLink>
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;