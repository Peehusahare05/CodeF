import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCarbonHistory } from "../services/carbonService";
import { calculateSimulation } from "../services/simulatorService";
import PageHeader from "../components/simulator/PageHeader";
import FootprintCard from "../components/simulator/FootprintCard";
import ChartCard from "../components/simulator/ChartCard";
import ResultsCard from "../components/simulator/ResultsCard";
import InsightCard from "../components/simulator/InsightCard";
import SimulationControls from "../components/simulator/SimulationControls";
import ComparisonCard from "../components/simulator/ComparisonCard";
import CTASection from "../components/simulator/CTASection";

const FALLBACK_BASELINE = {
  transportCO2: 18.9,
  electricityCO2: 13.4,
  wasteCO2: 6.2,
  plasticCO2: 3.5,
  totalCO2: 42,
  ecoScore: 72,
};

const toSimulationPayload = (baseline, changes) => ({
  baseline,
  adjustments: {
    transportationPct: Number(changes.transportation || 0),
    electricityPct: Number(changes.electricity || 0),
    wastePct: Number(changes.waste || 0),
    plasticPct: changes.plastic === "low" ? 60 : changes.plastic === "medium" ? 30 : 0,
  },
});

const SimulatorPage = () => {
  const navigate = useNavigate();
  const [baselineData, setBaselineData] = useState(null);
  const [simulationData, setSimulationData] = useState(null);
  const [loadingBaseline, setLoadingBaseline] = useState(true);
  const [simulating, setSimulating] = useState(false);
  const [error, setError] = useState("");

  // State for user changes
  const [changes, setChanges] = useState({
    transportation: 0, // percentage reduction 0-100%
    electricity: 0,
    waste: 0,
    plastic: "current", // current, medium, low
  });

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const loadBaseline = async () => {
      try {
        setError("");
        const history = await getCarbonHistory(1, 1);
        const latest = history?.data?.[0]?.results;

        if (latest) {
          setBaselineData({
            transportCO2: Number(latest.transportCO2 ?? 0),
            electricityCO2: Number(latest.electricityCO2 ?? 0),
            wasteCO2: Number(latest.wasteCO2 ?? 0),
            plasticCO2: Number(latest.plasticCO2 ?? 0),
            totalCO2: Number(latest.totalCO2 ?? 0),
            ecoScore: Number(latest.ecoScore ?? 0),
          });
        } else {
          setBaselineData(FALLBACK_BASELINE);
        }
      } catch (err) {
        setError(err.message || "Could not load baseline data.");
        setBaselineData(FALLBACK_BASELINE);
      } finally {
        setLoadingBaseline(false);
      }
    };

    loadBaseline();
  }, []);

  useEffect(() => {
    if (!baselineData) return;

    let active = true;

    const runSimulation = async () => {
      try {
        setSimulating(true);
        const response = await calculateSimulation(
          toSimulationPayload(baselineData, changes),
        );
        if (active) {
          setSimulationData(response?.data || null);
        }
      } catch (err) {
        if (active) {
          setError(err.message || "Could not calculate simulation.");
        }
      } finally {
        if (active) {
          setSimulating(false);
        }
      }
    };

    runSimulation();

    return () => {
      active = false;
    };
  }, [baselineData, changes]);

  // Build dashboard-friendly simulation data
  const calculations = useMemo(() => {
    const baseline = baselineData || FALLBACK_BASELINE;
    const projected = simulationData?.projected || baseline;
    const reduction = simulationData?.reduction || {
      reducedByKgPerWeek: 0,
      reducedByPercent: 0,
      ecoScoreDelta: 0,
    };

    const totalReduction = Number(reduction.reducedByKgPerWeek || 0);
    const reductionPercent = Number(reduction.reducedByPercent || 0);
    const scoreImprovement = Number(reduction.ecoScoreDelta || 0);

    const monthlySavings = Number((totalReduction * 4.33).toFixed(2));
    const yearlySavings = Number((totalReduction * 52).toFixed(2));
    const costSavings = Number((yearlySavings * 0.18).toFixed(2));

    return {
      baselineWeekly: Number(baseline.totalCO2 || 0),
      newWeekly: Number(projected.totalCO2 || 0),
      totalReduction,
      reductionPercent,
      baselineEcoScore: Number(baseline.ecoScore || 0),
      newEcoScore: Number(projected.ecoScore || 0),
      scoreImprovement,
      monthlySavings,
      yearlySavings,
      costSavings,
      breakdown: {
        transportation: {
          current: Number(baseline.transportCO2 || 0),
          after: Number(projected.transportCO2 || 0),
          reduction: Number((baseline.transportCO2 || 0) - (projected.transportCO2 || 0)),
          icon: "🚗",
          name: "Transportation",
        },
        electricity: {
          current: Number(baseline.electricityCO2 || 0),
          after: Number(projected.electricityCO2 || 0),
          reduction: Number((baseline.electricityCO2 || 0) - (projected.electricityCO2 || 0)),
          icon: "⚡",
          name: "Electricity",
        },
        waste: {
          current: Number(baseline.wasteCO2 || 0),
          after: Number(projected.wasteCO2 || 0),
          reduction: Number((baseline.wasteCO2 || 0) - (projected.wasteCO2 || 0)),
          icon: "♻️",
          name: "Waste",
        },
        plastic: {
          current: Number(baseline.plasticCO2 || 0),
          after: Number(projected.plasticCO2 || 0),
          reduction: Number((baseline.plasticCO2 || 0) - (projected.plasticCO2 || 0)),
          icon: "🛍️",
          name: "Plastic",
        },
      },
    };
  }, [baselineData, simulationData]);

  // Generate dynamic insights
  const insights = useMemo(() => {
    if (calculations.totalReduction === 0) {
      return {
        text: "Adjust the sliders to see your potential carbon savings. Even small changes add up!",
        recommendations: [
          "Start with just one category to see immediate impact",
          "Focus on transportation for the biggest reduction",
          "Track your progress weekly for motivation",
        ],
      };
    }

    const reductions = Object.values(calculations.breakdown)
      .map((cat) => ({ ...cat, percent: (cat.reduction / calculations.totalReduction) * 100 }))
      .sort((a, b) => b.reduction - a.reduction);

    const topImpact = reductions[0];
    const primaryFactor =
      topImpact.name === "Transportation"
        ? "commute changes"
        : topImpact.name === "Electricity"
          ? "reducing energy"
          : topImpact.name === "Waste"
            ? "composting"
            : "using reusables";

    const recommendations = [];
    if (calculations.reductionPercent >= 50) {
      recommendations.push(
        `Excellent target! Reducing ${calculations.reductionPercent}% will require significant lifestyle changes.`
      );
    } else if (calculations.reductionPercent >= 20) {
      recommendations.push(
        `Great goal! A ${calculations.reductionPercent}% reduction is achievable with consistent effort.`
      );
    }

    recommendations.push(
      `${topImpact.name} is your highest impact area (${reductions[0].percent.toFixed(0)}% of total reduction).`
    );
    recommendations.push(
      `Your eco score can improve from ${calculations.baselineEcoScore} → ${calculations.newEcoScore} (+${calculations.scoreImprovement} points).`
    );
    recommendations.push(
      `This equates to saving ${calculations.yearlySavings.toFixed(0)} kg CO₂ per year — that's like planting ${Math.round(calculations.yearlySavings / 21)} trees!`
    );

    return {
      text: `Smart strategies! By focusing on ${primaryFactor}, you can reduce your carbon footprint by ${calculations.reductionPercent}%. Your biggest impact comes from ${topImpact.name.toLowerCase()}. Start with one change and build from there.`,
      recommendations,
    };
  }, [calculations]);

  const handleChangeUpdate = (category, value) => {
    setChanges((prev) => ({ ...prev, [category]: value }));
  };

  const handleReset = () => {
    setChanges({
      transportation: 0,
      electricity: 0,
      waste: 0,
      plastic: "current",
    });
  };

  const handleApply = () => {
    navigate("/dashboard");
  };

  if (loadingBaseline) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-8">
        <div className="mx-auto max-w-7xl rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
          Loading simulator baseline...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <PageHeader onReset={handleReset} />

        {error && (
          <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
            {error}
          </div>
        )}

        {/* Content Grid */}
        <div className="space-y-8">
          {/* Top Row: Current Stats & Controls */}
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <FootprintCard
                current={calculations.baselineWeekly}
                reduction={calculations.totalReduction}
                percentage={calculations.reductionPercent}
              />
            </div>
            <div className="lg:col-span-2">
              <SimulationControls
                changes={changes}
                onChangeUpdate={handleChangeUpdate}
              />
            </div>
          </div>

          {/* Comparison Cards: Before/After */}
          <div className="grid gap-6 md:grid-cols-2">
            <ComparisonCard
              label="Current Weekly Footprint"
              value={calculations.baselineWeekly}
              ecoScore={calculations.baselineEcoScore}
              type="current"
            />
            <ComparisonCard
              label="Projected After Changes"
              value={calculations.newWeekly}
              ecoScore={calculations.newEcoScore}
              type="projected"
            />
          </div>

          {/* Chart & Insights Row */}
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ChartCard categories={Object.values(calculations.breakdown)} />
            </div>
            <div>
              <InsightCard
                insight={insights.text}
                recommendations={insights.recommendations}
              />
            </div>
          </div>

          {/* Results Summary */}
          <ResultsCard
            savings={{
              monthly: calculations.monthlySavings,
              yearly: calculations.yearlySavings,
              cost: calculations.costSavings,
            }}
          />

          {simulating && (
            <div className="rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-500">
              Recalculating simulation...
            </div>
          )}

          {/* CTA Section */}
          <CTASection onApply={handleApply} onViewDashboard={() => navigate("/dashboard")} />
        </div>
      </div>
    </div>
  );
};

export default SimulatorPage;
