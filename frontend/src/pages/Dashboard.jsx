import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart3,
  Car,
  Cloud,
  Package,
  Recycle,
  RefreshCw,
  Zap,
} from "lucide-react";

const EcoAIChatbot = lazy(() => import("../components/EcoAIChatbot"));
const DashboardDonutChart = lazy(() =>
  import("../components/charts/ChartWidgets").then((module) => ({
    default: module.DashboardDonutChart,
  })),
);
const DashboardLineChart = lazy(() =>
  import("../components/charts/ChartWidgets").then((module) => ({
    default: module.DashboardLineChart,
  })),
);

// ── Circular eco score ring ──────────────────────────────────────────────────
const EcoRing = ({ score }) => {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 70 ? "#16a34a" : score >= 40 ? "#f59e0b" : "#ef4444";

  return (
    <svg width="110" height="110" viewBox="0 0 110 110">
      <circle
        cx="55"
        cy="55"
        r={radius}
        fill="none"
        stroke="#e5e7eb"
        strokeWidth="10"
      />
      <circle
        cx="55"
        cy="55"
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth="10"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 55 55)"
        style={{ transition: "stroke-dashoffset 0.3s ease" }}
      />
      <text
        x="55"
        y="55"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="22"
        fontWeight="bold"
        fill={color}
      >
        {score}
      </text>
    </svg>
  );
};

// ── Emission category card ────────────────────────────────────────────────────
const EmissionCard = ({ iconNode, label, value, sub }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-4 sm:p-6 flex flex-col items-center text-center gap-1">
      <span className="mb-1">{iconNode}</span>
      <p className="text-slate-500 text-sm">{label}</p>
      <p className="text-xl sm:text-2xl font-extrabold text-slate-800">{value} kg CO₂</p>
      <p className="text-xs text-slate-400">{sub}</p>
    </div>
  );
};

// ── Main Dashboard ─────────────────────────────────────────────────────────────
const Dashboard = () => {
  const navigate = useNavigate();
  const chartsSectionRef = useRef(null);
  const [data] = useState(() => {
    const stored = localStorage.getItem("ecotrack_result");
    return stored ? JSON.parse(stored) : null;
  });
  const [shouldLoadCharts, setShouldLoadCharts] = useState(
    () => typeof window === "undefined" || !("IntersectionObserver" in window),
  );

  useEffect(() => {
    if (!data) {
      navigate("/");
    }
  }, [data, navigate]);

  useEffect(() => {
    if (shouldLoadCharts) return;
    const target = chartsSectionRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldLoadCharts(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px" },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [shouldLoadCharts]);

  if (!data) return null;

  const {
    transportCO2,
    electricityCO2,
    wasteCO2,
    plasticCO2,
    totalCO2,
    ecoScore,
    insight,
    trend,
  } = data;

  const statusLabel =
    ecoScore >= 70
      ? "Great progress"
      : ecoScore >= 40
        ? "Room to improve"
        : "High impact";
  const statusColor =
    ecoScore >= 70
      ? "text-green-600"
      : ecoScore >= 40
        ? "text-yellow-500"
        : "text-red-500";

  // Pie chart
  const pieData = {
    labels: ["Transportation", "Electricity", "Waste", "Plastic"],
    datasets: [
      {
        data: [transportCO2, electricityCO2, wasteCO2, plasticCO2],
        backgroundColor: ["#4ade80", "#60a5fa", "#fbbf24", "#f87171"],
        borderWidth: 2,
        borderColor: "#fff",
      },
    ],
  };

  const pieOptions = {
    plugins: { legend: { display: false } },
    cutout: "62%",
    responsive: true,
  };

  // Line chart
  const lineData = {
    labels: trend.map((t) => t.week),
    datasets: [
      {
        label: "CO₂ (kg)",
        data: trend.map((t) => t.value),
        borderColor: "#16a34a",
        backgroundColor: "rgba(22,163,74,0.12)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#16a34a",
        pointRadius: 5,
      },
    ],
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
    <div className="font-sans">
      <main className="section-wrap max-w-5xl py-6 md:py-10">
        {/* Page title */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900">
            Carbon Footprint Dashboard
          </h1>
          <p className="text-sm sm:text-base text-slate-500 mt-1 max-w-xl">
            Analyze your personal environmental impact based on your daily
            activities and discover how your lifestyle affects carbon emissions.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-4 mb-6 sm:gap-5 md:mb-8 lg:grid-cols-3">
          {/* Total emissions */}
          <div className="surface-card p-6 flex flex-col gap-2">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
              Total Carbon Emissions
            </p>
            <div className="flex items-center gap-3">
              <span className="icon-shell icon-shell-md icon-tone-green">
                <Cloud className="icon-glyph" />
              </span>
              <span className="text-3xl font-extrabold text-slate-900">
                {totalCO2}{" "}
                <span className="text-xl font-bold text-slate-600">
                  kg CO₂ / week
                </span>
              </span>
            </div>
            <p className="text-green-600 text-sm font-medium">
              {trend.length >= 2
                ? `↘ ${(((trend[0].value - trend[trend.length - 1].value) / trend[0].value) * 100).toFixed(0)}% lower than Week 1`
                : ""}
            </p>
          </div>

          {/* Eco Score */}
          <div className="surface-card p-5 sm:p-6 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-6">
            <EcoRing score={ecoScore} />
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                Eco Score
              </p>
              <p className="text-2xl font-extrabold text-slate-900">
                {ecoScore} / 100
              </p>
              <p className={`text-sm font-semibold mt-1 ${statusColor}`}>
                Status: {statusLabel}
              </p>
            </div>
          </div>

          {/* Key Insight */}
          <div className="surface-card border-green-200 bg-green-50 p-6 flex gap-4">
            <div className="icon-shell icon-shell-md bg-green-600 text-white rounded-xl shrink-0">
              <BarChart3 className="icon-glyph" />
            </div>
            <div>
              <p className="text-xs font-semibold text-green-700 uppercase tracking-widest mb-1">
                Key Insight
              </p>
              <p className="text-slate-700 text-sm leading-relaxed">
                {insight}
              </p>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div ref={chartsSectionRef} className="grid grid-cols-1 gap-4 mb-6 sm:gap-5 md:mb-8 md:grid-cols-2">
          {/* Donut */}
          <div className="surface-card p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-slate-800 text-lg">
                Emission Breakdown
              </h2>
              <span className="text-slate-300 text-xl cursor-pointer">•••</span>
            </div>
            <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start sm:gap-6">
              <div className="h-44 w-full max-w-[220px] sm:h-52 sm:max-w-[240px]">
                {shouldLoadCharts ? (
                  <Suspense fallback={<div className="h-full w-full rounded-xl bg-slate-50" />}>
                    <DashboardDonutChart data={pieData} options={pieOptions} />
                  </Suspense>
                ) : (
                  <div className="h-full w-full rounded-xl bg-slate-50" />
                )}
              </div>
              <div className="flex flex-1 flex-col gap-2 w-full">
                {[
                  {
                    label: "Transportation",
                    color: "bg-green-400",
                    pct: pct(transportCO2),
                  },
                  {
                    label: "Electricity",
                    color: "bg-blue-400",
                    pct: pct(electricityCO2),
                  },
                  {
                    label: "Waste",
                    color: "bg-yellow-400",
                    pct: pct(wasteCO2),
                  },
                  {
                    label: "Plastic Usage",
                    color: "bg-red-400",
                    pct: pct(plasticCO2),
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-3 h-3 rounded-full ${item.color}`}
                      ></span>
                      <span className="text-slate-600 text-sm">
                        {item.label}
                      </span>
                    </div>
                    <span className="font-semibold text-slate-700 text-sm">
                      {item.pct}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Line */}
          <div className="surface-card p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-slate-800 text-lg">
                Weekly Carbon Trend
              </h2>
              <span className="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                Last 3 Weeks
              </span>
            </div>
            {shouldLoadCharts ? (
              <Suspense fallback={<div className="h-56 sm:h-64 bg-slate-50 rounded-xl" />}>
                <DashboardLineChart data={lineData} options={lineOptions} />
              </Suspense>
            ) : (
              <div className="h-56 sm:h-64 bg-slate-50 rounded-xl" />
            )}
          </div>
        </div>

        {/* Detailed Cards */}
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
          Detailed Emissions by Category
        </p>
        <div className="grid grid-cols-1 gap-3 mb-8 sm:grid-cols-2 sm:gap-4 md:mb-10 lg:grid-cols-4">
          <EmissionCard
            iconNode={(
              <span className="icon-shell icon-shell-md icon-tone-green">
                <Car className="icon-glyph" />
              </span>
            )}
            label="Transport Emissions"
            value={transportCO2}
            sub={`Based on ${(Number(data.inputs?.distance || 0) * 7).toFixed(0)} km/week`}
          />
          <EmissionCard
            iconNode={(
              <span className="icon-shell icon-shell-md icon-tone-blue">
                <Zap className="icon-glyph" />
              </span>
            )}
            label="Electricity Emissions"
            value={electricityCO2}
            sub={`Based on ${(Number(data.inputs?.electricity || 0) * 7).toFixed(0)} kWh/week`}
          />
          <EmissionCard
            iconNode={(
              <span className="icon-shell icon-shell-md icon-tone-yellow">
                <Recycle className="icon-glyph" />
              </span>
            )}
            label="Waste Emissions"
            value={wasteCO2}
            sub={`Landfill contribution`}
          />
          <EmissionCard
            iconNode={(
              <span className="icon-shell icon-shell-md icon-tone-red">
                <Package className="icon-glyph" />
              </span>
            )}
            label="Plastic Emissions"
            value={plasticCO2}
            sub={`${data.inputs?.plastic} consumption level`}
          />
        </div>

        {/* CTA Banner */}
        <div className="surface-card border-green-100 bg-green-50 p-5 sm:p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-slate-900 text-xl sm:text-2xl font-bold">
              Ready to reduce your footprint?
            </h3>
            <p className="text-slate-600 text-sm mt-1 max-w-2xl">
              Join our next community challenge and compete for the most
              improved Eco Score.
            </p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="btn-primary w-full md:w-auto"
          >
            <span className="inline-flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Recalculate
            </span>
          </button>
        </div>
      </main>
      {/* Floating AI Chatbot */}
      <Suspense fallback={null}>
        <EcoAIChatbot />
      </Suspense>
    </div>
  );
};

export default Dashboard;
