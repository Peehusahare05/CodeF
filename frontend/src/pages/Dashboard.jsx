import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";

ChartJS.register(
  ArcElement, Tooltip, Legend,
  CategoryScale, LinearScale, PointElement, LineElement, Filler
);

// ── Circular eco score ring ──────────────────────────────────────────────────
const EcoRing = ({ score }) => {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 70 ? "#16a34a" : score >= 40 ? "#f59e0b" : "#ef4444";

  return (
    <svg width="110" height="110" viewBox="0 0 110 110">
      <circle cx="55" cy="55" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="10" />
      <circle
        cx="55" cy="55" r={radius} fill="none"
        stroke={color} strokeWidth="10"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 55 55)"
        style={{ transition: "stroke-dashoffset 1s ease" }}
      />
      <text x="55" y="55" textAnchor="middle" dominantBaseline="central"
        fontSize="22" fontWeight="bold" fill={color}>
        {score}
      </text>
    </svg>
  );
};

// ── Emission category card ────────────────────────────────────────────────────
const EmissionCard = ({ icon, label, value, sub }) => (
  <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center text-center gap-1">
    <span className="text-3xl mb-1">{icon}</span>
    <p className="text-slate-500 text-sm">{label}</p>
    <p className="text-2xl font-extrabold text-slate-800">{value} kg CO₂</p>
    <p className="text-xs text-slate-400">{sub}</p>
  </div>
);

// ── Main Dashboard ─────────────────────────────────────────────────────────────
const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("ecotrack_result");
    if (!stored) {
      navigate("/");
      return;
    }
    setData(JSON.parse(stored));
  }, [navigate]);

  if (!data) return null;

  const { transportCO2, electricityCO2, wasteCO2, plasticCO2, totalCO2, ecoScore, insight, trend } = data;

  const statusLabel =
    ecoScore >= 70 ? "Great progress 🌿" : ecoScore >= 40 ? "Room to improve 🌱" : "High impact ⚠️";
  const statusColor =
    ecoScore >= 70 ? "text-green-600" : ecoScore >= 40 ? "text-yellow-500" : "text-red-500";

  // Pie chart
  const pieData = {
    labels: ["Transportation", "Electricity", "Waste", "Plastic"],
    datasets: [{
      data: [transportCO2, electricityCO2, wasteCO2, plasticCO2],
      backgroundColor: ["#4ade80", "#60a5fa", "#fbbf24", "#f87171"],
      borderWidth: 2,
      borderColor: "#fff",
    }],
  };

  const pieOptions = {
    plugins: { legend: { display: false } },
    cutout: "62%",
    responsive: true,
  };

  // Line chart
  const lineData = {
    labels: trend.map((t) => t.week),
    datasets: [{
      label: "CO₂ (kg)",
      data: trend.map((t) => t.value),
      borderColor: "#16a34a",
      backgroundColor: "rgba(22,163,74,0.12)",
      fill: true,
      tension: 0.4,
      pointBackgroundColor: "#16a34a",
      pointRadius: 5,
    }],
  };

  const lineOptions = {
    plugins: { legend: { display: false } },
    scales: {
      y: { grid: { color: "#f1f5f9" }, ticks: { color: "#94a3b8" } },
      x: { grid: { display: false }, ticks: { color: "#94a3b8" } },
    },
    responsive: true,
  };

  const totalPie = transportCO2 + electricityCO2 + wasteCO2 + plasticCO2 || 1;
  const pct = (v) => ((v / totalPie) * 100).toFixed(0);

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 bg-gradient-to-tr from-green-500 to-green-400 rounded-full flex items-center justify-center text-white font-bold text-xl">🌱</span>
          <span className="font-extrabold text-2xl text-green-700 tracking-tight">EcoTracker</span>
        </div>
        <div className="hidden md:flex gap-8 text-slate-600 font-medium text-sm">
          <span className="text-green-600 font-semibold border-b-2 border-green-500 pb-0.5">Dashboard</span>
          <button onClick={() => navigate("/")} className="hover:text-green-600 transition">Activities</button>
          <span className="hover:text-green-600 transition cursor-pointer">Insights</span>
          <span className="hover:text-green-600 transition cursor-pointer">Resources</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-slate-400 text-xl cursor-pointer hover:text-slate-600">🔔</span>
          <div className="w-9 h-9 rounded-full bg-orange-400 flex items-center justify-center text-white font-bold text-sm">U</div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-10">
        {/* Page title */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">Carbon Footprint Dashboard</h1>
          <p className="text-slate-500 mt-1 max-w-xl">
            Analyze your personal environmental impact based on your daily activities and discover how your lifestyle affects carbon emissions.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {/* Total emissions */}
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col gap-2">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Total Carbon Emissions</p>
            <div className="flex items-center gap-3">
              <span className="text-3xl">☁️</span>
              <span className="text-3xl font-extrabold text-slate-900">{totalCO2} <span className="text-xl font-bold text-slate-600">kg CO₂ / week</span></span>
            </div>
            <p className="text-green-600 text-sm font-medium">
              {trend.length >= 2
                ? `↘ ${(((trend[0].value - trend[trend.length - 1].value) / trend[0].value) * 100).toFixed(0)}% lower than Week 1`
                : ""}
            </p>
          </div>

          {/* Eco Score */}
          <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-6">
            <EcoRing score={ecoScore} />
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Eco Score</p>
              <p className="text-2xl font-extrabold text-slate-900">{ecoScore} / 100</p>
              <p className={`text-sm font-semibold mt-1 ${statusColor}`}>Status: {statusLabel}</p>
            </div>
          </div>

          {/* Key Insight */}
          <div className="bg-green-50 border border-green-200 rounded-2xl shadow p-6 flex gap-4">
            <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center text-white text-lg shrink-0">📊</div>
            <div>
              <p className="text-xs font-semibold text-green-700 uppercase tracking-widest mb-1">Key Insight</p>
              <p className="text-slate-700 text-sm leading-relaxed">{insight}</p>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {/* Donut */}
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-slate-800 text-lg">Emission Breakdown</h2>
              <span className="text-slate-300 text-xl cursor-pointer">•••</span>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-44 h-44">
                <Doughnut data={pieData} options={pieOptions} />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                {[
                  { label: "Transportation", color: "bg-green-400", pct: pct(transportCO2) },
                  { label: "Electricity", color: "bg-blue-400", pct: pct(electricityCO2) },
                  { label: "Waste", color: "bg-yellow-400", pct: pct(wasteCO2) },
                  { label: "Plastic Usage", color: "bg-red-400", pct: pct(plasticCO2) },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full ${item.color}`}></span>
                      <span className="text-slate-600 text-sm">{item.label}</span>
                    </div>
                    <span className="font-semibold text-slate-700 text-sm">{item.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Line */}
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-slate-800 text-lg">Weekly Carbon Trend</h2>
              <span className="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">Last 3 Weeks</span>
            </div>
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>

        {/* Detailed Cards */}
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Detailed Emissions by Category</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <EmissionCard icon="🚗" label="Transport Emissions" value={transportCO2}
            sub={`Based on ${(Number(data.inputs?.distance || 0) * 7).toFixed(0)} km/week`} />
          <EmissionCard icon="⚡" label="Electricity Emissions" value={electricityCO2}
            sub={`Based on ${(Number(data.inputs?.electricity || 0) * 7).toFixed(0)} kWh/week`} />
          <EmissionCard icon="♻️" label="Waste Emissions" value={wasteCO2}
            sub={`Landfill contribution`} />
          <EmissionCard icon="🧴" label="Plastic Emissions" value={plasticCO2}
            sub={`${data.inputs?.plastic} consumption level`} />
        </div>

        {/* CTA Banner */}
        <div className="bg-green-600 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-white text-2xl font-extrabold">Ready to reduce your footprint?</h3>
            <p className="text-green-100 text-sm mt-1">Join our next community challenge and compete for the most improved Eco Score.</p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="bg-white text-green-700 font-bold px-7 py-3 rounded-full shadow hover:bg-green-50 transition whitespace-nowrap"
          >
            Recalculate 🔄
          </button>
        </div>
      </main>

      <footer className="text-center py-8 text-slate-400 text-sm">
        © 2024 Environmental Impact Tracker. Powered by Sustainable Analytics AI.
      </footer>
    </div>
  );
};

export default Dashboard;
