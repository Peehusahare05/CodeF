import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Car, Zap, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
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
      <div className="mx-auto w-full max-w-6xl">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
          Loading simulator baseline...
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl">
      <SimulatorHeader onReset={handleReset} />

      {error && (
        <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
          {error}
        </div>
      )}

      <div className="space-y-6">
        {/* A. Current vs Projected */}
        <ComparisonCard
          currentCO2={calculations.baselineWeekly}
          projectedCO2={calculations.newWeekly}
          currentScore={calculations.baselineEcoScore}
          projectedScore={calculations.newEcoScore}
          reductionPercent={calculations.reductionPercent}
        />

        {/* B. Interactive Controls + Compact Category Impact */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_-24px_rgba(15,23,42,0.7)] sm:p-6">
          <h2 className="text-base font-semibold text-slate-900 sm:text-lg">Adjust Reductions</h2>
          <p className="mt-1 text-sm text-slate-500">One slider per category. Move right to increase reduction.</p>

          <div className="mt-4 space-y-3">
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

          <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Category Impact (Current vs After)</p>
            <div className="space-y-3">
              {Object.values(calculations.breakdown).map((cat) => {
                const ratio = cat.current > 0 ? Math.max(0, Math.min(100, (cat.after / cat.current) * 100)) : 0;
                return (
                  <div key={cat.name}>
                    <div className="mb-1.5 flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-700">{cat.name}</span>
                      <span className="text-slate-500">{cat.current.toFixed(1)} kg {"->"} {cat.after.toFixed(1)} kg</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                      <div className="h-full rounded-full bg-slate-700" style={{ width: `${ratio}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* C. Results + Insights + CTA */}
        <section className="grid gap-4 lg:grid-cols-3 lg:items-start">
          <div className="lg:col-span-2">
            <ResultCard
              monthly={calculations.monthlySavings}
              yearly={calculations.yearlySavings}
              cost={calculations.costSavings}
            />
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_-24px_rgba(15,23,42,0.7)]">
              <h3 className="text-sm font-semibold text-slate-900">AI Insights</h3>
              <ul className="mt-3 space-y-2">
                {insights.slice(0, 3).map((insight, index) => (
                  <li key={`${insight}-${index}`} className="flex items-start gap-2 text-xs text-slate-600">
                    <ArrowRight className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-slate-500" />
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_-24px_rgba(15,23,42,0.7)]">
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleApply}
                  className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
                >
                  Apply Changes
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/dashboard")}
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
          </div>
        </section>

        {simulating && (
          <div className="rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-500">
            Recalculating simulation...
          </div>
        )}
      </div>
    </div>
  );
};

export default SimulatorPage;
