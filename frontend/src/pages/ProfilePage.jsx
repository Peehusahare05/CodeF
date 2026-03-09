import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

// ── Helpers ──────────────────────────────────────────────────────────────────
const getEcoColor = (score) => {
  if (score >= 70) return "text-green-600";
  if (score >= 40) return "text-yellow-500";
  return "text-red-500";
};

const getEcoLabel = (score) => {
  if (score >= 70) return "Great 🌿";
  if (score >= 40) return "Moderate 🌱";
  return "High Impact ⚠️";
};

// ── Stat Card ─────────────────────────────────────────────────────────────────
const StatCard = ({ icon, label, value, sub, color = "text-slate-800" }) => (
  <div className="bg-white rounded-2xl shadow p-5 flex flex-col gap-1">
    <span className="text-2xl">{icon}</span>
    <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">{label}</p>
    <p className={`text-2xl font-extrabold ${color}`}>{value}</p>
    {sub && <p className="text-xs text-slate-400">{sub}</p>}
  </div>
);

// ── Profile Page ──────────────────────────────────────────────────────────────
const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("ecotrack_user");
    const token = localStorage.getItem("ecotrack_token");
    if (!stored || !token) { navigate("/auth"); return; }
    setUser(JSON.parse(stored));

    // Fetch carbon history from backend
    fetch("/api/carbon/history", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setHistory(data.data || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load history. Make sure the backend is running.");
        setLoading(false);
      });
  }, [navigate]);

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
        type: "linear", position: "left",
        title: { display: true, text: "CO₂ (kg)", color: "#16a34a" },
        grid: { color: "#f1f5f9" },
        ticks: { color: "#94a3b8" },
      },
      y1: {
        type: "linear", position: "right",
        title: { display: true, text: "Eco Score", color: "#60a5fa" },
        min: 0, max: 100,
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
    localStorage.removeItem("ecotrack_token");
    localStorage.removeItem("ecotrack_user");
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
          <span className="w-8 h-8 bg-gradient-to-tr from-green-500 to-green-400 rounded-full flex items-center justify-center text-white text-xl">🌱</span>
          <span className="font-extrabold text-2xl text-green-700 tracking-tight">EcoTrack</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/track")} className="hidden md:block text-sm text-green-700 font-semibold border border-green-400 px-4 py-1.5 rounded-full hover:bg-green-50 transition">
            New Calculation
          </button>
          <button onClick={handleLogout} className="text-sm text-slate-500 hover:text-red-500 font-semibold border border-slate-200 px-4 py-1.5 rounded-full hover:bg-red-50 transition">
            Logout
          </button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-10">

        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row items-center gap-6 mb-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-green-500 to-green-400 flex items-center justify-center text-white text-4xl font-extrabold shadow-lg uppercase">
            {user.name ? user.name[0] : "U"}
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-extrabold text-slate-900">{user.name}</h1>
            <p className="text-slate-400 text-sm">{user.email}</p>
            <p className="text-green-600 text-sm font-medium mt-1">🌍 EcoTrack Member</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-slate-400 uppercase tracking-wide font-semibold mb-1">Trend</p>
            <p className={`font-bold text-base ${trend.includes("Improving") ? "text-green-600" : "text-red-500"}`}>
              {trend}
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard icon="📅" label="Calculations" value={history.length} sub="Total sessions" />
          <StatCard icon="☁️" label="Latest CO₂" value={latestCO2 !== "—" ? `${latestCO2} kg` : "—"} sub="This week" color="text-slate-800" />
          <StatCard icon="📊" label="Avg CO₂/week" value={avgCO2 !== "—" ? `${avgCO2} kg` : "—"} sub="All time average" />
          <StatCard icon="⭐" label="Best Eco Score" value={bestScore !== "—" ? `${bestScore}/100` : "—"} sub="Highest recorded" color="text-green-600" />
        </div>

        {/* Carbon History Chart */}
        <div className="bg-white rounded-2xl shadow p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-extrabold text-slate-800">Personal Carbon History</h2>
              <p className="text-slate-400 text-sm mt-0.5">Your weekly CO₂ emissions and Eco Score over time</p>
            </div>
            <span className="text-xs bg-green-50 text-green-700 font-semibold px-3 py-1 rounded-full border border-green-200">
              Last {history.length} week{history.length !== 1 ? "s" : ""}
            </span>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-48 text-slate-400">Loading history...</div>
          ) : error ? (
            <div className="flex items-center justify-center h-48 text-red-400 text-sm">{error}</div>
          ) : history.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 gap-3">
              <span className="text-4xl">📭</span>
              <p className="text-slate-400 text-sm">No carbon history yet.</p>
              <button onClick={() => navigate("/track")} className="bg-green-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-green-700 transition">
                Calculate Now →
              </button>
            </div>
          ) : (
            <Line data={lineData} options={lineOptions} />
          )}
        </div>

        {/* Weekly breakdown table */}
        {history.length > 0 && (
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-extrabold text-slate-800 mb-4">Weekly Breakdown</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-slate-400 uppercase tracking-wide border-b border-slate-100">
                    <th className="pb-3 pr-4">Week</th>
                    <th className="pb-3 pr-4">Total CO₂</th>
                    <th className="pb-3 pr-4">Eco Score</th>
                    <th className="pb-3 pr-4">Transport</th>
                    <th className="pb-3 pr-4">Electricity</th>
                    <th className="pb-3 pr-4">Waste</th>
                    <th className="pb-3">Plastic</th>
                  </tr>
                </thead>
                <tbody>
                  {chronological.map((record, i) => (
                    <tr key={record._id} className="border-b border-slate-50 hover:bg-green-50 transition">
                      <td className="py-3 pr-4 font-semibold text-slate-700">Week {i + 1}</td>
                      <td className="py-3 pr-4 font-bold text-slate-800">{record.results?.totalCO2} kg</td>
                      <td className={`py-3 pr-4 font-bold ${getEcoColor(record.results?.ecoScore)}`}>
                        {record.results?.ecoScore} — {getEcoLabel(record.results?.ecoScore)}
                      </td>
                      <td className="py-3 pr-4 text-slate-600">{record.results?.transportCO2} kg</td>
                      <td className="py-3 pr-4 text-slate-600">{record.results?.electricityCO2} kg</td>
                      <td className="py-3 pr-4 text-slate-600">{record.results?.wasteCO2} kg</td>
                      <td className="py-3 text-slate-600">{record.results?.plasticCO2} kg</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>

      <footer className="text-center py-8 text-slate-400 text-sm">
        © 2024 Environmental Impact Tracker. Powered by Sustainable Analytics AI.
      </footer>
    </div>
  );
};

export default ProfilePage;
