import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../utils/api";
import {
  BarChart3,
  CalendarDays,
  Cloud,
  Inbox,
  LogOut,
  Star,
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

// ── Stat Card ─────────────────────────────────────────────────────────────────
const StatCard = ({
  iconNode,
  label,
  value,
  sub,
  color = "text-slate-800",
}) => {
  return (
    <div className="surface-card flex flex-col gap-1 p-4 sm:p-5">
      <span>{iconNode}</span>
      <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">
        {label}
      </p>
      <p className={`text-xl font-extrabold sm:text-2xl ${color}`}>{value}</p>
      {sub && <p className="text-xs text-slate-400">{sub}</p>}
    </div>
  );
};

// ── Profile Page ──────────────────────────────────────────────────────────────
const ProfilePage = () => {
  const navigate = useNavigate();
  const historyChartRef = useRef(null);
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
  const avgCO2 = co2Values.length
    ? (co2Values.reduce((a, b) => a + b, 0) / co2Values.length).toFixed(1)
    : "—";
  const bestScore = ecoScores.length ? Math.max(...ecoScores) : "—";
  const latestCO2 = co2Values.length ? co2Values[co2Values.length - 1] : "—";
  const trend =
    co2Values.length >= 2
      ? co2Values[co2Values.length - 1] < co2Values[0]
        ? "↘ Improving"
        : "↗ Increasing"
      : "Not enough data";

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
    <div className="font-sans">
      <main className="section-wrap max-w-4xl py-8 md:py-10">
        {/* Profile Header */}
        <div className="surface-card mb-6 flex flex-col items-center gap-5 p-5 sm:p-6 md:mb-8 md:flex-row md:gap-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-600 text-4xl font-extrabold uppercase text-white">
            {user.name ? user.name[0] : "U"}
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
              {user.name}
            </h1>
            <p className="text-slate-400 text-sm">{user.email}</p>
            <p className="text-green-600 text-sm font-medium mt-1">
              <span className="inline-flex items-center gap-1">
                <User className="icon-glyph-sm" />
                EcoTrack Member
              </span>
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-slate-400 uppercase tracking-wide font-semibold mb-1">
              Trend
            </p>
            <p
              className={`font-bold text-base ${trend.includes("Improving") ? "text-green-600" : "text-red-500"}`}
            >
              {trend}
            </p>
          </div>

          <div className="w-full md:w-auto md:ml-auto">
            <button
              onClick={handleLogout}
              className="btn-secondary w-full md:w-auto"
            >
              <span className="inline-flex items-center gap-2">
                <LogOut className="icon-glyph-sm" />
                Logout
              </span>
            </button>
          </div>
        </div>

        {/* Edit Profile Form */}
        {editSuccess && (
          <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl px-4 py-3 mb-4 text-center">
            {editSuccess}
          </div>
        )}
        {!editMode ? (
          <button
            onClick={handleEditOpen}
            className="mb-6 w-full rounded-full border border-green-400 px-5 py-2 text-sm font-semibold text-green-700 transition-colors hover:bg-green-50 sm:w-auto"
          >
            Edit Profile
          </button>
        ) : (
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
            label="Calculations"
            value={history.length}
            sub="Total sessions"
          />
          <StatCard
            iconNode={
              <span className="icon-shell icon-shell-md icon-tone-blue">
                <Cloud className="icon-glyph" />
              </span>
            }
            label="Latest CO₂"
            value={latestCO2 !== "—" ? `${latestCO2} kg` : "—"}
            sub="This week"
            color="text-slate-800"
          />
          <StatCard
            iconNode={
              <span className="icon-shell icon-shell-md icon-tone-emerald">
                <BarChart3 className="icon-glyph" />
              </span>
            }
            label="Avg CO₂/week"
            value={avgCO2 !== "—" ? `${avgCO2} kg` : "—"}
            sub="All time average"
          />
          <StatCard
            iconNode={
              <span className="icon-shell icon-shell-md icon-tone-yellow">
                <Star className="icon-glyph" />
              </span>
            }
            label="Best Eco Score"
            value={bestScore !== "—" ? `${bestScore}/100` : "—"}
            sub="Highest recorded"
            color="text-green-600"
          />
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
            <div className="flex flex-col items-center justify-center h-48 gap-3">
              <span className="icon-shell icon-shell-lg icon-tone-slate rounded-full">
                <Inbox className="icon-glyph-lg" />
              </span>
              <p className="text-slate-400 text-sm">No carbon history yet.</p>
              <button
                onClick={() => navigate("/track")}
                className="btn-primary px-5 py-2 text-sm"
              >
                Calculate Now →
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
            <h2 className="mb-4 text-base font-bold text-slate-800 sm:text-lg">
              Weekly Breakdown
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm">
                <thead>
                  <tr className="text-left text-xs text-slate-400 uppercase tracking-wide border-b border-slate-100">
                    <th className="pb-3 pr-4">Week</th>
                    <th className="pb-3 pr-4">Total CO₂</th>
                    <th className="pb-3 pr-4">Eco Score</th>
                    <th className="pb-3 pr-4">Transport (km/day)</th>
                    <th className="pb-3 pr-4">Electricity (kWh/day)</th>
                    <th className="pb-3 pr-4">Waste (kg/week)</th>
                    <th className="pb-3">Plastic Level</th>
                  </tr>
                </thead>
                <tbody>
                  {chronological.map((record, i) => (
                    <tr
                      key={record._id}
                      className="border-b border-slate-50 transition-colors hover:bg-green-50"
                    >
                      <td className="py-3 pr-4 font-semibold text-slate-700">
                        Week {i + 1}
                      </td>
                      <td className="py-3 pr-4 font-bold text-slate-800">
                        {record.results?.totalCO2} kg
                      </td>
                      <td
                        className={`py-3 pr-4 font-bold ${getEcoColor(record.results?.ecoScore)}`}
                      >
                        {record.results?.ecoScore} —{" "}
                        {getEcoLabel(record.results?.ecoScore)}
                      </td>
                      <td className="py-3 pr-4 text-slate-600">
                        {record.inputs?.distance !== undefined &&
                          record.inputs?.distance !== ""
                          ? `${record.inputs.distance} km/day`
                          : `${record.results?.transportCO2 ?? "—"} kg CO₂/week`}
                      </td>
                      <td className="py-3 pr-4 text-slate-600">
                        {record.inputs?.electricity !== undefined &&
                          record.inputs?.electricity !== ""
                          ? `${record.inputs.electricity} kWh/day`
                          : `${record.results?.electricityCO2 ?? "—"} kg CO₂/week`}
                      </td>
                      <td className="py-3 pr-4 text-slate-600">
                        {record.inputs?.waste !== undefined &&
                          record.inputs?.waste !== ""
                          ? `${record.inputs.waste} kg/week`
                          : `${record.results?.wasteCO2 ?? "—"} kg CO₂/week`}
                      </td>
                      <td className="py-3 text-slate-600">
                        {record.inputs?.plastic
                          ? formatPlasticLevel(record.inputs.plastic)
                          : `${record.results?.plasticCO2 ?? "—"} kg CO₂/week`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProfilePage;
