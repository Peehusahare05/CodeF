import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Car,
  Zap,
  Trash2,
  ShoppingBag,
  TrendingDown,
  Lightbulb,
  ArrowRight,
} from "lucide-react";
import PageHeader from "../components/simulator/PageHeader";
import FootprintCard from "../components/simulator/FootprintCard";
import ChartCard from "../components/simulator/ChartCard";
import ResultsCard from "../components/simulator/ResultsCard";
import InsightCard from "../components/simulator/InsightCard";
import SimulationControls from "../components/simulator/SimulationControls";
import ComparisonCard from "../components/simulator/ComparisonCard";
import CTASection from "../components/simulator/CTASection";

const CARBON_FACTORS = {
  transportation: 0.192,
  electricity: 0.233,
  waste: 0.198,
  plastic: 0.156,
};

const SimulatorPage = () => {
  const navigate = useNavigate();

  // Fetch initial data from localStorage
  const baselineData = (() => {
    const stored = localStorage.getItem("ecotrack_result");
    if (!stored) {
      return {
        totalCO2: 42,
        ecoScore: 72,
        transportCO2: 18.9,
        electricityCO2: 13.4,
        wasteCO2: 6.2,
        plasticCO2: 3.5,
      };
    }
    return JSON.parse(stored);
  })();

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

  // Calculate new values based on changes
  const calculations = useMemo(() => {
    const baseTransport = baselineData.transportCO2 || 18.9;
    const baseElectric = baselineData.electricityCO2 || 13.4;
    const baseWaste = baselineData.wasteCO2 || 6.2;
    const basePlastic = baselineData.plasticCO2 || 3.5;

    // Calculate reductions
    const transportReduction = (baseTransport * changes.transportation) / 100;
    const electricReduction = (baseElectric * changes.electricity) / 100;
    const wasteReduction = (baseWaste * changes.waste) / 100;

    let plasticReduction = 0;
    if (changes.plastic === "low") plasticReduction = basePlastic * 0.6;
    else if (changes.plastic === "medium") plasticReduction = basePlastic * 0.3;

    const newTransport = Math.max(0, baseTransport - transportReduction);
    const newElectric = Math.max(0, baseElectric - electricReduction);
    const newWaste = Math.max(0, baseWaste - wasteReduction);
    const newPlastic = Math.max(0, basePlastic - plasticReduction);

    const totalReduction =
      transportReduction + electricReduction + wasteReduction + plasticReduction;
    const currentWeekly = baselineData.totalCO2 || 42;
    const newWeekly = Math.max(0, currentWeekly - totalReduction);
    const reductionPercent =
      currentWeekly > 0 ? Math.round((totalReduction / currentWeekly) * 100) : 0;

    // Calculate new eco score (progressive improvement)
    const baseEcoScore = baselineData.ecoScore || 72;
    const maxEcoScore = 100;
    const scoreImprovement = Math.min(
      maxEcoScore - baseEcoScore,
      (reductionPercent / 100) * 28 + (reductionPercent > 20 ? 5 : 0)
    );
    const newEcoScore = Math.round(baseEcoScore + scoreImprovement);

    // Calculate monthly and yearly savings
    const monthlySavings = totalReduction * 4.33;
    const yearlySavings = totalReduction * 52;
    const costSavings = yearlySavings * 0.18; // ~$0.18 per kg CO2 saved

    return {
      baselineWeekly: currentWeekly,
      newWeekly,
      totalReduction,
      reductionPercent,
      baselineEcoScore: baseEcoScore,
      newEcoScore,
      scoreImprovement: Math.round(scoreImprovement),
      monthlySavings,
      yearlySavings,
      costSavings,
      breakdown: {
        transportation: {
          current: baseTransport,
          after: newTransport,
          reduction: transportReduction,
          icon: "🚗",
          name: "Transportation",
        },
        electricity: {
          current: baseElectric,
          after: newElectric,
          reduction: electricReduction,
          icon: "⚡",
          name: "Electricity",
        },
        waste: {
          current: baseWaste,
          after: newWaste,
          reduction: wasteReduction,
          icon: "♻️",
          name: "Waste",
        },
        plastic: {
          current: basePlastic,
          after: newPlastic,
          reduction: plasticReduction,
          icon: "🛍️",
          name: "Plastic",
        },
      },
    };
  }, [changes, baselineData]);

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
    // Save simulation results and navigate to dashboard
    const simulationResult = {
      timestamp: new Date().toISOString(),
      baseline: calculations.baselineWeekly,
      projected: calculations.newWeekly,
      reduction: calculations.totalReduction,
      reductionPercent: calculations.reductionPercent,
      baselineEcoScore: calculations.baselineEcoScore,
      newEcoScore: calculations.newEcoScore,
      changes,
    };
    localStorage.setItem("simulator_result", JSON.stringify(simulationResult));
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <PageHeader onReset={handleReset} />

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

          {/* CTA Section */}
          <CTASection onApply={handleApply} onViewDashboard={() => navigate("/dashboard")} />
        </div>
      </div>
    </div>
  );
};

export default SimulatorPage;
