import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Car, Zap, Trash2, ShoppingBag } from "lucide-react";
import { getCarbonHistory } from "../services/carbonService";
import { calculateSimulation } from "../services/simulatorService";
import SimulatorHeader from "../components/simulator/SimulatorHeader";
import ComparisonCard from "../components/simulator/ComparisonCard";
import SliderRow from "../components/simulator/SliderRow";
import ResultCard from "../components/simulator/ResultCard";

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
    plasticPct: Number(changes.plastic || 0),
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
    plastic: 0,
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
      return [
        "Start with one category to see immediate impact.",
        "Transportation and electricity usually drive the biggest reductions.",
        "Small weekly changes compound quickly over time.",
      ];
    }

    const reductions = Object.values(calculations.breakdown)
      .map((cat) => ({ ...cat, percent: (cat.reduction / calculations.totalReduction) * 100 }))
      .sort((a, b) => b.reduction - a.reduction);

    const topImpact = reductions[0];
    const recommendations = [];
    if (calculations.reductionPercent >= 50) {
      recommendations.push(
        `Aggressive target: ${calculations.reductionPercent.toFixed(1)}% reduction is possible with consistent execution.`
      );
    } else if (calculations.reductionPercent >= 20) {
      recommendations.push(
        `Strong target: ${calculations.reductionPercent.toFixed(1)}% reduction is practical and realistic.`
      );
    }

    recommendations.push(
      `${topImpact.name} contributes ${reductions[0].percent.toFixed(0)}% of your projected reduction.`
    );
    recommendations.push(
      `Eco score can improve ${calculations.baselineEcoScore} -> ${calculations.newEcoScore} (+${calculations.scoreImprovement}).`
    );
    recommendations.push(
      `Projected annual reduction: ${calculations.yearlySavings.toFixed(0)} kg CO2.`
    );

    return recommendations;
  }, [calculations]);

  const categoryControls = [
    { key: "transportation", label: "Transportation", icon: Car, max: 100 },
    { key: "electricity", label: "Electricity", icon: Zap, max: 100 },
    { key: "waste", label: "Waste", icon: Trash2, max: 100 },
    { key: "plastic", label: "Plastic", icon: ShoppingBag, max: 60 },
  ];

  const handleChangeUpdate = (category, value) => {
    setChanges((prev) => ({ ...prev, [category]: value }));
  };

  const handleReset = () => {
    setChanges({
      transportation: 0,
      electricity: 0,
      waste: 0,
      plastic: 0,
    });
  };

  const handleApply = () => {
    navigate("/track");
  };

  if (loadingBaseline) {
    return (
      <div className="min-w-0">
        <div className="rounded-lg border border-slate-200 bg-white p-3 text-xs text-slate-500 sm:rounded-xl sm:p-4 sm:text-sm">
          Loading simulator baseline...
        </div>
      </div>
    );
  }

  return (
    <div className="min-w-0 space-y-3 font-sans sm:space-y-4 lg:space-y-6">
      {/* Header */}
      <SimulatorHeader onReset={handleReset} />

      {/* Error Alert */}
      {error && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-700 sm:rounded-xl sm:p-4 sm:text-sm">
          {error}
        </div>
      )}

      {/* Current vs Projected - Responsive */}
      <ComparisonCard
        currentCO2={calculations.baselineWeekly}
        projectedCO2={calculations.newWeekly}
        currentScore={calculations.baselineEcoScore}
        projectedScore={calculations.newEcoScore}
        reductionPercent={calculations.reductionPercent}
      />

      {/* Adjust Reductions - Sliders + Category Impact */}
      <section className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:rounded-xl sm:p-4 lg:rounded-2xl lg:p-6">
        <h2 className="text-sm font-semibold text-slate-900 sm:text-base lg:text-lg">
          Adjust Reductions
        </h2>
        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
          Move sliders right to increase reduction.
        </p>

        {/* Sliders - Responsive Spacing */}
        <div className="mt-3 space-y-2 sm:space-y-3 lg:space-y-4">
          {categoryControls.map((item) => (
            <SliderRow
              key={item.key}
              icon={item.icon}
              label={item.label}
              value={changes[item.key]}
              max={item.max}
              onChange={(value) => handleChangeUpdate(item.key, value)}
            />
          ))}
        </div>

        {/* Category Impact Bars - Responsive */}
        <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3 sm:mt-5 sm:rounded-xl sm:p-4 lg:mt-6 lg:rounded-2xl lg:p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
            Category Impact (Current vs After)
          </p>
          <div className="mt-3 space-y-2 sm:space-y-3 lg:space-y-4">
            {Object.values(calculations.breakdown).map((cat) => {
              const ratio =
                cat.current > 0
                  ? Math.max(
                      0,
                      Math.min(100, (cat.after / cat.current) * 100)
                    )
                  : 0;
              return (
                <div key={cat.name}>
                  <div className="mb-1.5 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-2 text-xs">
                    <span className="font-medium text-slate-700">{cat.name}</span>
                    <span className="text-slate-500">
                      {cat.current.toFixed(1)} kg {"->"} {cat.after.toFixed(1)}{" "}
                      kg
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200 sm:h-2">
                    <div
                      className="h-full rounded-full bg-slate-700 transition-all"
                      style={{ width: `${ratio}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Results + Insights + CTA - Responsive Grid */}
      <section className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-6 lg:items-start">
        {/* Main Results (spans 2 cols on desktop) */}
        <div className="lg:col-span-2">
          <ResultCard
            monthly={calculations.monthlySavings}
            yearly={calculations.yearlySavings}
            cost={calculations.costSavings}
          />
        </div>

        {/* Sidebar - AI Insights + Buttons */}
        <div className="space-y-3 sm:space-y-4 lg:space-y-6">
          {/* AI Insights */}
          <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:rounded-xl sm:p-4 lg:rounded-2xl lg:p-6">
            <h3 className="text-xs font-semibold text-slate-900 sm:text-sm lg:text-base">
              AI Insights
            </h3>
            <ul className="mt-2 space-y-2 sm:mt-3">
              {insights.slice(0, 3).map((insight, index) => (
                <li
                  key={`${insight}-${index}`}
                  className="flex items-start gap-2 text-xs text-slate-600 sm:text-sm"
                >
                  <svg
                    className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-slate-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:space-y-3 sm:rounded-xl sm:p-4 lg:rounded-2xl lg:p-6">
            <button
              type="button"
              onClick={handleApply}
              className="w-full inline-flex items-center justify-center rounded-lg border border-slate-200 bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-slate-800 sm:rounded-xl sm:px-4 sm:py-2 sm:text-sm lg:rounded-2xl"
            >
              Apply Changes
            </button>
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="w-full inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 sm:rounded-xl sm:px-4 sm:py-2 sm:text-sm lg:rounded-2xl"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </section>

      {/* Loading State */}
      {simulating && (
        <div className="rounded-lg border border-slate-200 bg-white p-3 text-xs text-slate-500 sm:rounded-xl sm:p-4 sm:text-sm">
          Recalculating simulation...
        </div>
      )}
    </div>
  );
};

export default SimulatorPage;
