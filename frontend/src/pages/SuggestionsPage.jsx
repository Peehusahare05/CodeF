import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Lightbulb,
  Zap,
  ShoppingBag,
  Car,
  Droplet,
  Recycle,
  Thermometer,
} from "lucide-react";
import { generateSuggestions } from "../services/suggestionService";
import PageHeader from "../components/suggestions/PageHeader";
import ImpactCard from "../components/suggestions/ImpactCard";
import RecommendationCard from "../components/suggestions/RecommendationCard";
import EcoTipCard from "../components/suggestions/EcoTipCard";
import SimulationCard from "../components/suggestions/SimulationCard";
import CTASection from "../components/suggestions/CTASection";

const CATEGORY_META = {
  Transportation: {
    icon: <Car className="h-5 w-5 text-red-500" />,
    title: "Use Public Transport Weekly",
    description:
      "Replace short private-vehicle trips with bus, metro, cycling, or walking to reduce commute emissions.",
    factor: 0.3,
    tips: [
      "Batch errands into one route to avoid extra trips",
      "Use public transport for at least 2 weekly commutes",
    ],
  },
  Electricity: {
    icon: <Zap className="h-5 w-5 text-amber-500" />,
    title: "Reduce Electricity Consumption",
    description:
      "Cut idle appliance usage and shift to efficient devices to bring down home energy footprint.",
    factor: 0.24,
    tips: [
      "Switch off standby devices before sleep",
      "Use LED bulbs and natural light where possible",
    ],
  },
  Waste: {
    icon: <Recycle className="h-5 w-5 text-green-500" />,
    title: "Improve Waste Habits",
    description:
      "Segregate organic and recyclable waste to reduce landfill methane emissions.",
    factor: 0.22,
    tips: [
      "Start a small kitchen compost routine",
      "Separate dry and wet waste daily",
    ],
  },
  Plastic: {
    icon: <ShoppingBag className="h-5 w-5 text-blue-500" />,
    title: "Cut Single-Use Plastic",
    description:
      "Reduce disposable packaging with reusables and better purchase planning.",
    factor: 0.2,
    tips: [
      "Carry reusable bags and bottles",
      "Choose low-packaging products",
    ],
  },
};

const IMPACT_BY_INDEX = ["high", "medium", "low", "low"];

const SUGGESTION_ICON = {
  Transportation: <Car className="h-5 w-5 text-red-500" />,
  Electricity: <Zap className="h-5 w-5 text-amber-500" />,
  Waste: <Recycle className="h-5 w-5 text-green-500" />,
  Plastic: <ShoppingBag className="h-5 w-5 text-blue-500" />,
  General: <Lightbulb className="h-5 w-5 text-slate-500" />,
};

const SuggestionsPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [suggestionData, setSuggestionData] = useState(null);

  useEffect(() => {
    const loadSuggestions = async () => {
      try {
        setError("");
        const response = await generateSuggestions();
        setSuggestionData(response?.data || null);
      } catch (err) {
        setError(err.message || "Could not load suggestions.");
      } finally {
        setLoading(false);
      }
    };

    loadSuggestions();
  }, []);

  const results = suggestionData?.results || {};
  const weekly = Number(results?.totalCO2 ?? 42);
  const ecoScore = Number(results?.ecoScore ?? 72);

  const categoryValues = {
    Transportation: Number(results?.transportCO2 ?? 18.9),
    Electricity: Number(results?.electricityCO2 ?? 13.4),
    Waste: Number(results?.wasteCO2 ?? 6.2),
    Plastic: Number(results?.plasticCO2 ?? 3.5),
  };

  const sortedCategories = Object.entries(categoryValues).sort(
    (a, b) => b[1] - a[1],
  );
  const topCategory = sortedCategories[0]?.[0] || "Transportation";

  const recommendationItems = useMemo(() => {
    const serverItems = suggestionData?.suggestions || [];
    if (!serverItems.length) return [];

    return serverItems.map((item, index) => ({
      category: item.category,
      icon: SUGGESTION_ICON[item.category] || SUGGESTION_ICON.General,
      impact: IMPACT_BY_INDEX[index] || "low",
      title: item.title,
      description: item.action,
      reduction: `Reduce ${item.estimatedReductionKgPerWeek} kg CO2 / week`,
      monthlyReduction: Math.round(Number(item.estimatedReductionKgPerWeek || 0) * 4),
    }));
  }, [suggestionData]);

  const quickTips = useMemo(() => {
    const fromServer = (suggestionData?.suggestions || []).map((item) => item.action);
    const fallback = [
      ...sortedCategories.flatMap(([category]) => CATEGORY_META[category].tips),
      "Track your score weekly to see improvement trends",
    ];
    return [...fromServer, ...fallback].slice(0, 4);
  }, [suggestionData, sortedCategories]);

  const monthlyPotential = recommendationItems.reduce(
    (sum, item) => sum + item.monthlyReduction,
    0,
  );
  const savedWeekly = Math.max(
    2,
    Math.min(weekly * 0.4, Math.round(monthlyPotential / 4 || 0)),
  );
  const projectedAfter = Math.max(8, Number((weekly - savedWeekly).toFixed(1)));
  const annualPotential = Math.round(savedWeekly * 52);

  const tipIcons = [
    <Lightbulb className="h-4 w-4 text-slate-500" />,
    <Droplet className="h-4 w-4 text-slate-500" />,
    <Recycle className="h-4 w-4 text-slate-500" />,
    <Thermometer className="h-4 w-4 text-slate-500" />,
  ];

  if (loading) {
    return (
      <div className="font-sans mx-auto w-full max-w-7xl min-w-0">
        <div className="surface-card p-3 text-xs text-slate-500 shadow-sm sm:p-4 sm:text-sm lg:p-6">Loading suggestions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="font-sans mx-auto w-full max-w-7xl min-w-0">
        <div className="surface-card border-red-200 bg-red-50 p-3 text-center shadow-sm sm:p-4 lg:p-6">
          <h2 className="text-lg font-bold text-red-700 sm:text-xl lg:text-2xl">Could not load suggestions</h2>
          <p className="mt-2 text-xs text-red-600 sm:text-sm">{error}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-4 rounded-xl bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-700 sm:text-sm"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans mx-auto w-full max-w-7xl min-w-0 space-y-3 sm:space-y-4 lg:space-y-6">
      <PageHeader onRecalculate={() => navigate("/track")} />

      <section>
        <ImpactCard weekly={weekly} ecoScore={ecoScore} topCategory={topCategory} />
      </section>

      <section className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-6">
        <div className="lg:col-span-2 min-w-0">
          <h2 className="mb-3 text-lg font-bold tracking-tight text-slate-900 sm:mb-4 sm:text-xl lg:text-2xl">
            AI Recommendations
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {recommendationItems.map((item) => (
              <RecommendationCard
                key={item.category}
                icon={item.icon}
                impact={item.impact}
                title={item.title}
                description={item.description}
                reduction={item.reduction}
              />
            ))}
          </div>
        </div>

        <aside className="lg:col-span-1 min-w-0">
          <h3 className="mb-3 text-lg font-bold tracking-tight text-slate-900 sm:mb-4 sm:text-xl lg:text-2xl">
            Quick Eco-Tips
          </h3>
          <div className="space-y-3">
            {quickTips.map((tip, index) => (
              <EcoTipCard
                key={`${tip}-${index}`}
                icon={tipIcons[index % tipIcons.length]}
                tip={tip}
              />
            ))}
          </div>
        </aside>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
        <div className="min-w-0">
          <SimulationCard
            current={weekly}
            after={projectedAfter}
            saved={savedWeekly}
          />
        </div>
        <div className="surface-card self-start border-slate-200 bg-white p-3 shadow-sm sm:p-4 lg:p-6">
          <h3 className="mb-2 text-lg font-bold text-slate-900 sm:text-xl lg:text-2xl">
            Did you know?
          </h3>
          <p className="text-xs text-slate-600 sm:text-sm">
            {suggestionData?.insight?.summary ? `${suggestionData.insight.summary} ` : ""}
            If you consistently apply these recommendations, your projected
            savings are about {annualPotential} kg CO2 per year based on your
            current footprint pattern.
          </p>
        </div>
      </section>

      <CTASection
        onApply={() => navigate("/track")}
        onViewDashboard={() => navigate("/dashboard")}
      />
    </div>
  );
};

export default SuggestionsPage;
