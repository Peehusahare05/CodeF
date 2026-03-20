import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../utils/api";
import {
  BarChart3,
  CalendarDays,
  ChevronRight,
  Cloud,
  Flame,
  Inbox,
  LogOut,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Trophy,
  User,
} from "lucide-react";

const ProfileLineChart = lazy(() =>
  import("../components/charts/ChartWidgets").then((module) => ({
    default: module.ProfileLineChart,
  })),
);

// ── Helpers ──────────────────────────────────────────────────────────────────
const getEcoColor = (score) => {
  if (score >= 70) return "text-green-600";
  if (score >= 40) return "text-yellow-500";
  return "text-red-500";
};

const getEcoLabel = (score) => {
  if (score >= 70) return "Great";
  if (score >= 40) return "Moderate";
  return "High Impact";
};

const formatPlasticLevel = (value) => {
  if (!value) return "—";
  const map = {
    low: "Low",
    medium: "Medium",
    high: "High",
  };
  return map[String(value).toLowerCase()] || String(value);
};

const formatDate = (value) => {
  if (!value) return "No activity yet";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "No activity yet";
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getEcoLevel = (score) => {
  if (score >= 70) return "Advanced";
  if (score >= 40) return "Intermediate";
  return "Beginner";
};

const getMemberType = (sessions) => {
  if (sessions >= 20) return "Climate Champion";
  if (sessions >= 8) return "Active Tracker";
  return "Eco Starter";
};

const getProgressMeta = (score) => {
  if (score < 40) {
    return {
      current: "Beginner",
      target: "Intermediate",
      value: Math.min(100, Math.round((score / 40) * 100)),
    };
  }
  if (score < 70) {
    return {
      current: "Intermediate",
      target: "Advanced",
      value: Math.min(100, Math.round(((score - 40) / 30) * 100)),
    };
  }
  return {
    current: "Advanced",
    target: "Level Maxed",
    value: 100,
  };
};

// ── Stat Card ─────────────────────────────────────────────────────────────────
const StatCard = ({
  iconNode,
  label,
  value,
  sub,
  color = "text-slate-800",
}) => {
  return (
    <div className="surface-card flex h-full flex-col gap-1 p-4 transition-all hover:-translate-y-0.5 hover:shadow-md sm:p-5">
      <span>{iconNode}</span>
      <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">
        {label}
      </p>
      <p className={`text-xl font-extrabold sm:text-2xl ${color}`}>{value}</p>
      {sub && <p className="text-xs text-slate-400">{sub}</p>}
    </div>
  );
};

const AchievementBadge = ({ title, description, unlocked, icon }) => {
  return (
    <div
      className={`rounded-xl border p-4 transition-all ${unlocked
        ? "border-green-200 bg-green-50"
        : "border-slate-200 bg-slate-50"
        }`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`icon-shell icon-shell-md rounded-lg ${unlocked ? "icon-tone-green" : "icon-tone-slate"
            }`}
        >
          {icon}
        </span>
        <div>
          <p
            className={`text-sm font-bold ${unlocked ? "text-green-700" : "text-slate-700"
              }`}
          >
            {title}
          </p>
          <p className="mt-1 text-xs text-slate-500">{description}</p>
          <p
            className={`mt-2 text-[11px] font-semibold uppercase tracking-wide ${unlocked ? "text-green-700" : "text-slate-400"
              }`}
          >
            {unlocked ? "Unlocked" : "In Progress"}
          </p>
        </div>
      </div>
    </div>
  );
};

// ── Profile Page ──────────────────────────────────────────────────────────────
const ProfilePage = () => {
  const navigate = useNavigate();
  const historyChartRef = useRef(null);
  const [rangeFilter, setRangeFilter] = useState("all");
  const [scoreFilter, setScoreFilter] = useState("all");
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("ecotrack_user");
    if (!stored) return null;
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  });
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", email: "", currentPassword: "", newPassword: "" });
  const [editError, setEditError] = useState("");
  const [editSuccess, setEditSuccess] = useState("");
  const [editLoading, setEditLoading] = useState(false);
  const [shouldLoadHistoryChart, setShouldLoadHistoryChart] = useState(
    () => typeof window === "undefined" || !("IntersectionObserver" in window),
  );

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const meResponse = await apiFetch("/api/auth/me");
        if (!meResponse.ok) {
          localStorage.removeItem("ecotrack_user");
          navigate("/auth");
          return;
        }

        const meData = await meResponse.json();
        if (meData.user) {
          setUser(meData.user);
          localStorage.setItem("ecotrack_user", JSON.stringify(meData.user));
        }

        const historyResponse = await apiFetch("/api/carbon/history");
        const historyData = await historyResponse.json();
        setHistory(historyData.data || []);
      } catch {
        setError("Could not load profile data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadProfileData();
  }, [navigate]);

  useEffect(() => {
    if (shouldLoadHistoryChart) return;
    const target = historyChartRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldLoadHistoryChart(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px" },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [shouldLoadHistoryChart]);

  const handleEditOpen = () => {
    setEditForm({ name: user?.name || "", email: user?.email || "", currentPassword: "", newPassword: "" });
    setEditError("");
    setEditSuccess("");
    setEditMode(true);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    setEditError("");
    setEditSuccess("");
    try {
      const body = { name: editForm.name, email: editForm.email };
      if (editForm.newPassword) {
        body.currentPassword = editForm.currentPassword;
        body.newPassword = editForm.newPassword;
      }
      const res = await apiFetch("/api/auth/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        setEditError(data.message || "Update failed.");
      } else {
        setUser(data.user);
        localStorage.setItem("ecotrack_user", JSON.stringify(data.user));
        setEditSuccess("Profile updated successfully!");
        setEditMode(false);
      }
    } catch {
      setEditError("Could not connect to server.");
    } finally {
      setEditLoading(false);
    }
  };

  // Build chart data from history (oldest → newest)
  const chronological = [...history].reverse();
  const labels = chronological.map((_, i) => `Week ${i + 1}`);
  const co2Values = chronological.map((r) => r.results?.totalCO2 ?? 0);
  const ecoScores = chronological.map((r) => r.results?.ecoScore ?? 0);

  const lineData = {
    labels,
    datasets: [
      {
        label: "CO₂ (kg/week)",
        data: co2Values,
        borderColor: "#16a34a",
        backgroundColor: "rgba(22,163,74,0.10)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#16a34a",
        pointRadius: 5,
        yAxisID: "y",
      },
      {
        label: "Eco Score",
        data: ecoScores,
        borderColor: "#60a5fa",
        backgroundColor: "rgba(96,165,250,0.08)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#60a5fa",
        pointRadius: 5,
        yAxisID: "y1",
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: { position: "top", labels: { boxWidth: 12, font: { size: 12 } } },
      tooltip: {
        callbacks: {
          label: (ctx) =>
            ctx.datasetIndex === 0
              ? ` ${ctx.parsed.y} kg CO₂`
              : ` Eco Score: ${ctx.parsed.y}`,
        },
      },
    },
    scales: {
      y: {
        type: "linear",
        position: "left",
        title: { display: true, text: "CO₂ (kg)", color: "#16a34a" },
        grid: { color: "#f1f5f9" },
        ticks: { color: "#94a3b8" },
      },
      y1: {
        type: "linear",
        position: "right",
        title: { display: true, text: "Eco Score", color: "#60a5fa" },
        min: 0,
        max: 100,
        grid: { drawOnChartArea: false },
        ticks: { color: "#94a3b8" },
      },
      x: { grid: { display: false }, ticks: { color: "#94a3b8" } },
    },
  };

  // Summary stats from all history
  const totalCO2Tracked = co2Values.length
    ? co2Values.reduce((a, b) => a + b, 0).toFixed(1)
    : "—";
  const avgCO2 = co2Values.length
    ? (co2Values.reduce((a, b) => a + b, 0) / co2Values.length).toFixed(1)
    : "—";
  const bestScore = ecoScores.length ? Math.max(...ecoScores) : "—";
  const latestCO2 = co2Values.length ? co2Values[co2Values.length - 1] : "—";
  const latestRecord = chronological.length ? chronological[chronological.length - 1] : null;
  const latestEcoScore = latestRecord?.results?.ecoScore ?? 0;
  const ecoLevel = getEcoLevel(latestEcoScore);
  const memberType = getMemberType(history.length);
  const progressMeta = getProgressMeta(latestEcoScore);
  const lastActivity = formatDate(latestRecord?.createdAt);
  const trend =
    co2Values.length >= 2
      ? co2Values[co2Values.length - 1] < co2Values[0]
        ? "↘ Improving"
        : "↗ Increasing"
      : "Not enough data";

  const rangeScopedRows =
    rangeFilter === "last4"
      ? chronological.slice(-4)
      : rangeFilter === "last8"
        ? chronological.slice(-8)
        : chronological;

  const filteredRows = rangeScopedRows.filter((record) => {
    if (scoreFilter === "all") return true;
    const score = Number(record.results?.ecoScore ?? 0);
    if (scoreFilter === "advanced") return score >= 70;
    if (scoreFilter === "intermediate") return score >= 40 && score < 70;
    return score < 40;
  });

  const achievements = [
    {
      title: "First Footprint Logged",
      description: "Complete your first carbon calculation",
      unlocked: history.length >= 1,
      icon: <Target className="icon-glyph" />,
    },
    {
      title: "Consistency Builder",
      description: "Track footprint for at least 4 weeks",
      unlocked: history.length >= 4,
      icon: <CalendarDays className="icon-glyph" />,
    },
    {
      title: "Eco Score Star",
      description: "Reach an eco score of 70 or above",
      unlocked: Number(bestScore) >= 70,
      icon: <Star className="icon-glyph" />,
    },
    {
      title: "Low Carbon Week",
      description: "Bring weekly emissions below 25 kg CO₂",
      unlocked: typeof latestCO2 === "number" && latestCO2 <= 25,
      icon: <Trophy className="icon-glyph" />,
    },
  ];

  const handleLogout = () => {
    apiFetch("/api/auth/logout", {
      method: "POST",
    }).finally(() => {
      localStorage.removeItem("ecotrack_user");
      navigate("/");
    });
  };

  if (!user && loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Loading profile...
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="font-sans bg-slate-50">
      <main className="section-wrap max-w-4xl py-8 md:py-10">
        {/* Profile Header */}
        <div className="surface-card mb-6 overflow-hidden p-0 md:mb-8">
          <div className="bg-gradient-to-r from-green-600 to-emerald-500 p-5 text-white sm:p-6">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 text-4xl font-extrabold uppercase text-white backdrop-blur-sm">
                  {user.name ? user.name[0] : "U"}
                </div>
                <div>
                  <h1 className="text-2xl font-bold sm:text-3xl">{user.name}</h1>
                  <p className="text-sm text-green-50">{user.email}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs font-semibold">
                    <span className="rounded-full bg-white/20 px-3 py-1">
                      {memberType}
                    </span>
                    <span className="rounded-full bg-white/20 px-3 py-1">
                      Eco Level: {ecoLevel}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 md:min-w-[280px]">
                <div className="rounded-xl bg-white/15 p-3">
                  <p className="text-[11px] uppercase tracking-wide text-green-50">
                    Total CO₂ Tracked
                  </p>
                  <p className="mt-1 text-lg font-bold">
                    {totalCO2Tracked !== "—" ? `${totalCO2Tracked} kg` : "—"}
                  </p>
                </div>
                <div className="rounded-xl bg-white/15 p-3">
                  <p className="text-[11px] uppercase tracking-wide text-green-50">
                    Current Trend
                  </p>
                  <p className="mt-1 text-lg font-bold">{trend}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <p className="text-sm text-slate-600">
              Keep tracking weekly to unlock higher eco levels and achievements.
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleEditOpen}
                className="btn-secondary px-5 py-2 text-sm"
              >
                Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="btn-secondary px-5 py-2 text-sm"
              >
                <span className="inline-flex items-center gap-2">
                  <LogOut className="icon-glyph-sm" />
                  Logout
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Edit Profile Form */}
        {editSuccess && (
          <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl px-4 py-3 mb-4 text-center">
            {editSuccess}
          </div>
        )}
        {editMode && (
          <div className="surface-card mb-8 p-5 sm:p-6">
            <h2 className="mb-4 text-base font-bold text-slate-800 sm:text-lg">Edit Profile</h2>
            <form onSubmit={handleUpdateProfile} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Name</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm((p) => ({ ...p, name: e.target.value }))}
                    className="input-control py-2"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Email</label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm((p) => ({ ...p, email: e.target.value }))}
                    className="input-control py-2"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Current Password</label>
                  <input
                    type="password"
                    placeholder="Required only to change password"
                    value={editForm.currentPassword}
                    onChange={(e) => setEditForm((p) => ({ ...p, currentPassword: e.target.value }))}
                    className="input-control py-2"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">New Password</label>
                  <input
                    type="password"
                    placeholder="Leave blank to keep current"
                    value={editForm.newPassword}
                    onChange={(e) => setEditForm((p) => ({ ...p, newPassword: e.target.value }))}
                    className="input-control py-2"
                  />
                </div>
              </div>
              {editError && <p className="text-sm text-red-500">{editError}</p>}
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  disabled={editLoading}
                  className="btn-primary px-6 py-2 disabled:opacity-50"
                >
                  {editLoading ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="btn-secondary px-5 py-2"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Stats Grid */}
        <div className="mb-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          <StatCard
            iconNode={
              <span className="icon-shell icon-shell-md icon-tone-green">
                <CalendarDays className="icon-glyph" />
              </span>
            }
            label="Total Calculations"
            value={history.length}
            sub="All tracked sessions"
          />
          <StatCard
            iconNode={
              <span className="icon-shell icon-shell-md icon-tone-blue">
                <Cloud className="icon-glyph" />
              </span>
            }
            label="Average CO₂ / Week"
            value={avgCO2 !== "—" ? `${avgCO2} kg` : "—"}
            sub="Performance baseline"
            color="text-slate-800"
          />
          <StatCard
            iconNode={
              <span className="icon-shell icon-shell-md icon-tone-emerald">
                <Star className="icon-glyph" />
              </span>
            }
            label="Best Eco Score"
            value={bestScore !== "—" ? `${bestScore}/100` : "—"}
            sub="Highest achievement"
          />
          <StatCard
            iconNode={
              <span className="icon-shell icon-shell-md icon-tone-yellow">
                <CalendarDays className="icon-glyph" />
              </span>
            }
            label="Last Activity"
            value={lastActivity === "No activity yet" ? "No Activity" : lastActivity}
            sub="Most recent update"
            color="text-slate-700"
          />
        </div>

        {/* Eco Progress Section */}
        <div className="surface-card mb-8 p-5 sm:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-800 sm:text-xl">
                Eco Progress
              </h2>
              <p className="text-sm text-slate-500">
                Your current level: {progressMeta.current} | Next: {progressMeta.target}
              </p>
            </div>
            <span className="rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
              {latestEcoScore}/100 Score
            </span>
          </div>

          <div className="rounded-xl bg-slate-100 p-3">
            <div className="mb-2 flex items-center justify-between text-xs font-semibold text-slate-500">
              <span>Progress to next level</span>
              <span>{progressMeta.value}%</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-white">
              <div
                className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-500"
                style={{ width: `${progressMeta.value}%` }}
              />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-3">
              <p className="text-xs uppercase tracking-wide text-slate-400">Eco Level</p>
              <p className="mt-1 text-base font-bold text-slate-800">{ecoLevel}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-3">
              <p className="text-xs uppercase tracking-wide text-slate-400">Total CO₂ Tracked</p>
              <p className="mt-1 text-base font-bold text-slate-800">
                {totalCO2Tracked !== "—" ? `${totalCO2Tracked} kg` : "—"}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-3">
              <p className="text-xs uppercase tracking-wide text-slate-400">Member Type</p>
              <p className="mt-1 text-base font-bold text-slate-800">{memberType}</p>
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="surface-card mb-8 p-5 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-800 sm:text-xl">
                Achievements
              </h2>
              <p className="text-sm text-slate-500">
                Unlock milestones by staying consistent with your tracking.
              </p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
              <Sparkles className="icon-glyph-sm" />
              {achievements.filter((a) => a.unlocked).length}/{achievements.length} Unlocked
            </span>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {achievements.map((badge) => (
              <AchievementBadge
                key={badge.title}
                title={badge.title}
                description={badge.description}
                unlocked={badge.unlocked}
                icon={badge.icon}
              />
            ))}
          </div>
        </div>

        {/* Carbon History Chart */}
        <div ref={historyChartRef} className="surface-card mb-8 p-5 sm:p-6">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-800 sm:text-xl">
                Personal Carbon History
              </h2>
              <p className="text-slate-400 text-sm mt-0.5">
                Your weekly CO₂ emissions and Eco Score over time
              </p>
            </div>
            <span className="w-fit rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
              Last {history.length} week{history.length !== 1 ? "s" : ""}
            </span>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-48 text-slate-400">
              Loading history...
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-48 text-red-400 text-sm">
              {error}
            </div>
          ) : history.length === 0 ? (
            <div className="flex h-56 flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-slate-200 bg-slate-50/70 p-4 text-center">
              <span className="icon-shell icon-shell-lg icon-tone-slate rounded-2xl">
                <Inbox className="icon-glyph-lg" />
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-700">No carbon history yet</p>
                <p className="mt-1 text-xs text-slate-500">
                  Start your first calculation and unlock personalized progress insights.
                </p>
              </div>
              <button
                onClick={() => navigate("/track")}
                className="btn-primary px-5 py-2 text-sm"
              >
                <span className="inline-flex items-center gap-1">
                  Calculate Now
                  <ChevronRight className="icon-glyph-sm" />
                </span>
              </button>
            </div>
          ) : shouldLoadHistoryChart ? (
            <Suspense fallback={<div className="h-56 bg-slate-50 rounded-xl" />}>
              <ProfileLineChart data={lineData} options={lineOptions} />
            </Suspense>
          ) : (
            <div className="h-56 bg-slate-50 rounded-xl" />
          )}
        </div>

        {/* Weekly breakdown table */}
        {history.length > 0 && (
          <div className="surface-card p-5 sm:p-6">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-800 sm:text-lg">
                  Weekly Breakdown Analytics
                </h2>
                <p className="text-xs text-slate-500">
                  {filteredRows.length} visible row{filteredRows.length !== 1 ? "s" : ""} of {chronological.length}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <div className="rounded-full border border-slate-200 bg-white p-1">
                  {[
                    { key: "all", label: "All" },
                    { key: "last4", label: "Last 4" },
                    { key: "last8", label: "Last 8" },
                  ].map((option) => (
                    <button
                      key={option.key}
                      onClick={() => setRangeFilter(option.key)}
                      className={`rounded-full px-3 py-1 text-xs font-semibold transition ${rangeFilter === option.key
                          ? "bg-slate-800 text-white"
                          : "text-slate-500 hover:bg-slate-100"
                        }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>

                <div className="rounded-full border border-slate-200 bg-white p-1">
                  {[
                    { key: "all", label: "All Scores" },
                    { key: "advanced", label: "Advanced" },
                    { key: "intermediate", label: "Intermediate" },
                    { key: "beginner", label: "Beginner" },
                  ].map((option) => (
                    <button
                      key={option.key}
                      onClick={() => setScoreFilter(option.key)}
                      className={`rounded-full px-3 py-1 text-xs font-semibold transition ${scoreFilter === option.key
                          ? "bg-green-600 text-white"
                          : "text-slate-500 hover:bg-slate-100"
                        }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="max-h-[460px] overflow-auto rounded-xl border border-slate-100">
              <table className="w-full text-xs sm:text-sm">
                <thead>
                  <tr className="text-left text-xs text-slate-400 uppercase tracking-wide border-b border-slate-100">
                    <th className="sticky top-0 z-10 bg-white px-4 py-3">Week</th>
                    <th className="sticky top-0 z-10 bg-white px-4 py-3">Total CO₂</th>
                    <th className="sticky top-0 z-10 bg-white px-4 py-3">Trend</th>
                    <th className="sticky top-0 z-10 bg-white px-4 py-3">Eco Score</th>
                    <th className="sticky top-0 z-10 bg-white px-4 py-3">Delta</th>
                    <th className="sticky top-0 z-10 bg-white px-4 py-3">Transport</th>
                    <th className="sticky top-0 z-10 bg-white px-4 py-3">Electricity</th>
                    <th className="sticky top-0 z-10 bg-white px-4 py-3">Waste</th>
                    <th className="sticky top-0 z-10 bg-white px-4 py-3">Plastic</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRows.map((record) => {
                    const globalIndex = chronological.findIndex((row) => row._id === record._id);
                    const previous = globalIndex > 0 ? chronological[globalIndex - 1] : null;
                    const currentScore = Number(record.results?.ecoScore ?? 0);
                    const previousScore = Number(previous?.results?.ecoScore ?? 0);
                    const scoreDelta = previous ? currentScore - previousScore : 0;
                    const currentCO2 = Number(record.results?.totalCO2 ?? 0);
                    const previousCO2 = Number(previous?.results?.totalCO2 ?? 0);
                    const co2Delta = previous ? currentCO2 - previousCO2 : 0;
                    const trendChip =
                      !previous
                        ? { label: "Baseline", className: "bg-slate-100 text-slate-600" }
                        : co2Delta < 0
                          ? { label: "Improving", className: "bg-green-100 text-green-700" }
                          : co2Delta > 0
                            ? { label: "Rising", className: "bg-red-100 text-red-700" }
                            : { label: "Stable", className: "bg-amber-100 text-amber-700" };

                    return (
                      <tr
                        key={record._id}
                        className="border-b border-slate-50 transition-colors hover:bg-green-50/50"
                      >
                        <td className="px-4 py-3 font-semibold text-slate-700">
                          Week {globalIndex + 1}
                        </td>
                        <td className="px-4 py-3 font-bold text-slate-800">
                          {record.results?.totalCO2} kg
                        </td>
                        <td className="px-4 py-3">
                          <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${trendChip.className}`}>
                            {trendChip.label}
                          </span>
                        </td>
                        <td
                          className={`px-4 py-3 font-bold ${getEcoColor(record.results?.ecoScore)}`}
                        >
                          {record.results?.ecoScore} — {getEcoLabel(record.results?.ecoScore)}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`text-xs font-semibold ${!previous
                                ? "text-slate-500"
                                : scoreDelta > 0
                                  ? "text-green-600"
                                  : scoreDelta < 0
                                    ? "text-red-600"
                                    : "text-amber-600"
                              }`}
                          >
                            {!previous ? "—" : `${scoreDelta > 0 ? "+" : ""}${scoreDelta} pts`}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-600">
                          {record.inputs?.distance !== undefined &&
                            record.inputs?.distance !== ""
                            ? `${record.inputs.distance} km/day`
                            : `${record.results?.transportCO2 ?? "—"} kg CO₂/week`}
                        </td>
                        <td className="px-4 py-3 text-slate-600">
                          {record.inputs?.electricity !== undefined &&
                            record.inputs?.electricity !== ""
                            ? `${record.inputs.electricity} kWh/day`
                            : `${record.results?.electricityCO2 ?? "—"} kg CO₂/week`}
                        </td>
                        <td className="px-4 py-3 text-slate-600">
                          {record.inputs?.waste !== undefined &&
                            record.inputs?.waste !== ""
                            ? `${record.inputs.waste} kg/week`
                            : `${record.results?.wasteCO2 ?? "—"} kg CO₂/week`}
                        </td>
                        <td className="px-4 py-3 text-slate-600">
                          {record.inputs?.plastic
                            ? formatPlasticLevel(record.inputs.plastic)
                            : `${record.results?.plasticCO2 ?? "—"} kg CO₂/week`}
                        </td>
                      </tr>
                    );
                  })}
                  {filteredRows.length === 0 && (
                    <tr>
                      <td colSpan={9} className="px-4 py-8 text-center text-sm text-slate-500">
                        No rows match your current filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Engagement CTA */}
        <div className="surface-card border-green-100 bg-green-50 p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Ready for your next improvement?
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Log a new footprint, improve your eco level, and unlock your next badge.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                onClick={() => navigate("/track")}
                className="btn-primary px-5 py-2 text-sm"
              >
                <span className="inline-flex items-center gap-2">
                  <Flame className="icon-glyph-sm" />
                  Track This Week
                </span>
              </button>
              <button
                onClick={() => navigate("/simulator")}
                className="btn-secondary px-5 py-2 text-sm"
              >
                <span className="inline-flex items-center gap-2">
                  <ShieldCheck className="icon-glyph-sm" />
                  Open Simulator
                </span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
