import React, { lazy, Suspense, useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowRight,
    BarChart3,
    Car,
    Cloud,
    Lightbulb,
    Package,
    RefreshCw,
    Trash2,
    Zap,
} from "lucide-react";
import HeroSection from "../components/dashboard/HeroSection";
import MetricCard from "../components/dashboard/MetricCard";
import ChartCard from "../components/dashboard/ChartCard";
import ChartSection from "../components/dashboard/ChartSection";
import CategoryCard from "../components/dashboard/CategoryCard";
import DashboardEmptyState from "../components/dashboard/DashboardEmptyState";
import DashboardLoading from "../components/dashboard/DashboardLoading";
import { getCarbonHistory, getCarbonStats } from "../services/carbonService";
import {
    buildContributions,
    buildInsights,
    buildWeeklyTrend,
    calculateTrendDelta,
    getImpactLevel,
    getTopContributor,
} from "../utils/dashboardData";

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

const CATEGORY_STYLE = {
    transport: {
        color: "#10b981",
        icon: Car,
        tone: "bg-emerald-100 text-emerald-700",
        barTone: "bg-emerald-500",
        label: "Transportation",
    },
    electricity: {
        color: "#3b82f6",
        icon: Zap,
        tone: "bg-blue-100 text-blue-700",
        barTone: "bg-blue-500",
        label: "Electricity",
    },
    waste: {
        color: "#f59e0b",
        icon: Trash2,
        tone: "bg-amber-100 text-amber-700",
        barTone: "bg-amber-500",
        label: "Waste",
    },
    plastic: {
        color: "#ef4444",
        icon: Package,
        tone: "bg-rose-100 text-rose-700",
        barTone: "bg-rose-500",
        label: "Plastic",
    },
};

const Dashboard = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [snapshot, setSnapshot] = useState(null);

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                setError("");
                const [statsResponse, historyResponse] = await Promise.all([
                    getCarbonStats(),
                    getCarbonHistory(1, 10),
                ]);

                const history = historyResponse?.data || [];
                if (!history.length) {
                    setSnapshot(null);
                    return;
                }

                const latest = history[0];
                const trend = [...history]
                    .slice(0, 4)
                    .reverse()
                    .map((item, idx) => ({
                        week: `Week ${idx + 1}`,
                        value: Number(item?.results?.totalCO2 ?? 0),
                    }));

                setSnapshot({
                    values: {
                        transport: Number(latest?.results?.transportCO2 ?? 0),
                        electricity: Number(latest?.results?.electricityCO2 ?? 0),
                        waste: Number(latest?.results?.wasteCO2 ?? 0),
                        plastic: Number(latest?.results?.plasticCO2 ?? 0),
                        total: Number(latest?.results?.totalCO2 ?? 0),
                        ecoScore: Number(
                            statsResponse?.data?.latestEcoScore ??
                            latest?.results?.ecoScore ??
                            0,
                        ),
                    },
                    trend,
                    insight: latest?.insight || "",
                    inputs: latest?.inputs || {},
                });
            } catch (err) {
                setError(err.message || "Could not load dashboard data.");
                setSnapshot(null);
            } finally {
                setLoading(false);
            }
        };

        const timer = setTimeout(() => {
            loadDashboard();
        }, 220);

        return () => clearTimeout(timer);
    }, []);

    const derived = useMemo(() => {
        if (!snapshot) {
            return null;
        }

        const values = snapshot.values;
        const weeklyTrend = buildWeeklyTrend(values.total, snapshot.trend);
        const trendDelta = calculateTrendDelta(weeklyTrend);
        const impact = getImpactLevel(values.total);
        const generatedInsights = buildInsights(values);
        const contributions = buildContributions(values);
        const topContributor = getTopContributor(contributions);

        const chartBreakdown = contributions.map((item) => ({
            ...item,
            color: CATEGORY_STYLE[item.key].color,
            key: CATEGORY_STYLE[item.key].label,
        }));

        const pieData = {
            labels: chartBreakdown.map((item) => item.key),
            datasets: [
                {
                    data: chartBreakdown.map((item) => item.value),
                    backgroundColor: chartBreakdown.map((item) => item.color),
                    borderWidth: 2,
                    borderColor: "#ffffff",
                },
            ],
        };

        const pieOptions = {
            plugins: { legend: { display: false } },
            cutout: "70%",
            responsive: true,
        };

        const lineData = {
            labels: weeklyTrend.map((item) => item.week),
            datasets: [
                {
                    label: "CO2 (kg/week)",
                    data: weeklyTrend.map((item) => item.value),
                    borderColor: "#0f172a",
                    borderWidth: 3,
                    backgroundColor: (context) => {
                        const chart = context.chart;
                        const { ctx, chartArea } = chart;
                        if (!chartArea) {
                            return "rgba(15,23,42,0.16)";
                        }
                        const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                        gradient.addColorStop(0, "rgba(15,23,42,0.28)");
                        gradient.addColorStop(1, "rgba(15,23,42,0.02)");
                        return gradient;
                    },
                    fill: true,
                    tension: 0.42,
                    pointBackgroundColor: "#0f172a",
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    pointBorderColor: "#ffffff",
                    pointBorderWidth: 2,
                },
            ],
        };

        const lineOptions = {
            plugins: {
                legend: { display: false },
            },
            scales: {
                y: { grid: { color: "#e2e8f0" }, ticks: { color: "#64748b" } },
                x: { grid: { display: false }, ticks: { color: "#64748b" } },
            },
            responsive: true,
        };

        return {
            weeklyTrend,
            trendDelta,
            impact,
            generatedInsights,
            topContributor,
            chartBreakdown,
            pieData,
            pieOptions,
            lineData,
            lineOptions,
            contributions,
        };
    }, [snapshot]);

    const handleResetData = () => {
        navigate("/track");
    };

    if (loading) {
        return <DashboardLoading />;
    }

    if (error) {
        return (
            <div className="surface-card mx-auto max-w-3xl border border-red-200 bg-red-50 p-6 text-center">
                <h2 className="text-lg font-bold text-red-700">Unable to load dashboard</h2>
                <p className="mt-2 text-sm text-red-600">{error}</p>
                <button
                    type="button"
                    onClick={() => window.location.reload()}
                    className="mt-4 inline-flex items-center justify-center rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                >
                    Retry
                </button>
            </div>
        );
    }

    if (!snapshot || !derived) {
        return <DashboardEmptyState />;
    }

    const { values, inputs } = snapshot;

    return (
        <div className="space-y-6 lg:space-y-8">
            <HeroSection
                total={values.total}
                impact={derived.impact}
                topContributor={derived.topContributor ? {
                    label: CATEGORY_STYLE[derived.topContributor.key].label,
                    percentage: derived.topContributor.percentage,
                } : null}
                trendLabel={derived.trendDelta.label}
            />

            <section className="grid grid-cols-1 gap-4 lg:grid-cols-12">
                <div className="lg:col-span-7">
                    <MetricCard
                        title="Total Carbon Emissions"
                        value={`${values.total} kg CO2/week`}
                        subtitle="Primary footprint signal across your weekly routine"
                        trend={derived.trendDelta}
                        tone="emerald"
                        Icon={Cloud}
                        size="primary"
                    />
                </div>

                <div className="space-y-4 lg:col-span-5">
                    <MetricCard
                        title="Eco Score"
                        value={`${values.ecoScore} / 100`}
                        subtitle={values.ecoScore >= 70 ? "Efficient pattern" : "Opportunity to optimize"}
                        tone="blue"
                        variant="score"
                        score={values.ecoScore}
                    />
                    <MetricCard
                        title="Impact Level"
                        value={derived.impact.label}
                        subtitle={derived.topContributor ? `${CATEGORY_STYLE[derived.topContributor.key].label} is currently your main driver` : "Monitoring weekly impact signal"}
                        tone={derived.impact.tone}
                        Icon={BarChart3}
                    />
                </div>
            </section>

            <ChartSection
                DonutChart={DashboardDonutChart}
                pieData={derived.pieData}
                pieOptions={derived.pieOptions}
                breakdown={derived.chartBreakdown}
                insightTitle="Smart System Insight"
                insightText={`${snapshot.insight || derived.generatedInsights.primary} ${derived.topContributor ? `Focus first on ${CATEGORY_STYLE[derived.topContributor.key].label.toLowerCase()} to unlock the fastest reduction.` : ""}`}
            />

            <section>
                <ChartCard title="Weekly Carbon Trend" badge="4-Week Trajectory">
                    <div className="mb-3 flex items-center justify-between">
                        <p className="text-sm text-slate-500">Emission direction across recent weeks</p>
                        <span className={`text-xs font-semibold ${derived.trendDelta.isPositive ? "text-emerald-600" : "text-rose-600"}`}>
                            {derived.trendDelta.label}
                        </span>
                    </div>
                    <Suspense fallback={<div className="h-64 w-full animate-pulse rounded-2xl bg-slate-100" />}>
                        <DashboardLineChart data={derived.lineData} options={derived.lineOptions} />
                    </Suspense>
                </ChartCard>
            </section>

            <section>
                <div className="mb-3 flex items-center justify-between gap-3">
                    <h2 className="text-xl font-bold text-slate-900">Category Breakdown</h2>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                        Contribution + Progress
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {derived.contributions.map((item) => {
                        const style = CATEGORY_STYLE[item.key];
                        const Icon = style.icon;
                        const hintMap = {
                            transport: `${(Number(inputs.distance || 0) * 7).toFixed(1)} km weekly commute profile`,
                            electricity: `${(Number(inputs.electricity || 0) * 7).toFixed(1)} kWh weekly household usage`,
                            waste: "Waste disposal and landfill output contribution",
                            plastic: `${inputs.plastic || "low"} consumption pattern from daily plastic usage`,
                        };

                        return (
                            <CategoryCard
                                key={item.key}
                                Icon={Icon}
                                title={style.label}
                                value={item.value}
                                percentage={item.percentage}
                                description={hintMap[item.key]}
                                tone={style.tone}
                                barTone={style.barTone}
                            />
                        );
                    })}
                </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-[linear-gradient(135deg,#ffffff,#f8fafc)] p-5 shadow-[0_20px_42px_-34px_rgba(15,23,42,0.65)] sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-slate-900">Improve Your Footprint</h3>
                        <p className="mt-1 text-sm text-slate-500">
                            Recalculate with updated lifestyle inputs or jump to personalized suggestions.
                        </p>
                    </div>
                    <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                        <button
                            type="button"
                            onClick={() => navigate("/track")}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
                        >
                            <RefreshCw className="h-4 w-4" />
                            Recalculate
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/suggestions")}
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-100"
                        >
                            <Lightbulb className="h-4 w-4" />
                            View Suggestions
                            <ArrowRight className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            onClick={handleResetData}
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                        >
                            <Trash2 className="h-4 w-4" />
                            Reset
                        </button>
                    </div>
                </div>
            </section>

            <Suspense fallback={null}>
                <EcoAIChatbot />
            </Suspense>
        </div>
    );
};

export default Dashboard;
