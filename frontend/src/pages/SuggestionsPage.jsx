import React, { useMemo } from "react";
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

const SuggestionsPage = () => {
  const navigate = useNavigate();
  const result = useMemo(() => {
    const stored = localStorage.getItem("ecotrack_result");
    return stored ? JSON.parse(stored) : null;
  }, []);

  const weekly = result?.totalCO2 ?? 42;
  const ecoScore = result?.ecoScore ?? 72;

  const categoryValues = {
    Transportation: Number(result?.transportCO2 ?? 18.9),
    Electricity: Number(result?.electricityCO2 ?? 13.4),
    Waste: Number(result?.wasteCO2 ?? 6.2),
    Plastic: Number(result?.plasticCO2 ?? 3.5),
  };

  const sortedCategories = Object.entries(categoryValues).sort((a, b) => b[1] - a[1]);
  const totalCategoryCO2 = sortedCategories.reduce((sum, [, value]) => sum + value, 0) || 1;
  const topCategory = sortedCategories[0]?.[0] || "Transportation";

  const recommendationItems = sortedCategories.slice(0, 3).map(([category, value], index) => {
    const meta = CATEGORY_META[category];
    const share = Math.round((value / totalCategoryCO2) * 100);
    const monthlyReduction = Math.max(2, Math.round(value * 4 * meta.factor));

    return {
      category,
      icon: meta.icon,
      impact: IMPACT_BY_INDEX[index] || "low",
      title: meta.title,
      description: `${meta.description} ${category} currently contributes ${share}% of your weekly footprint.`,
      reduction: `Reduce ${monthlyReduction} kg CO2 / month`,
      monthlyReduction,
    };
  });

  const quickTips = [
    ...sortedCategories.flatMap(([category]) => CATEGORY_META[category].tips),
    "Track your score weekly to see improvement trends",
  ].slice(0, 4);

  const monthlyPotential = recommendationItems.reduce((sum, item) => sum + item.monthlyReduction, 0);
  const savedWeekly = Math.max(2, Math.min(weekly * 0.4, Math.round(monthlyPotential / 4)));
  const projectedAfter = Math.max(8, Number((weekly - savedWeekly).toFixed(1)));
  const annualPotential = Math.round(savedWeekly * 52);

  const tipIcons = [
    <Lightbulb className="h-4 w-4 text-slate-500" />,
    <Droplet className="h-4 w-4 text-slate-500" />,
    <Recycle className="h-4 w-4 text-slate-500" />,
    <Thermometer className="h-4 w-4 text-slate-500" />,
  ];

  return (
    <div className="font-sans">
      <main className="px-4 py-6 md:py-8">
        <div className="section-wrap max-w-6xl px-0 md:px-0">
          <PageHeader onRecalculate={() => navigate("/track")} />

          <section className="mb-6 md:mb-7">
            <ImpactCard weekly={weekly} ecoScore={ecoScore} topCategory={topCategory} />
          </section>

          <section className="mb-6 grid grid-cols-1 gap-5 lg:grid-cols-12 md:mb-7">
            <div className="lg:col-span-8">
              <h2 className="mb-3 text-2xl font-bold tracking-tight text-slate-900 md:mb-4 md:text-3xl">
                AI Recommendations
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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

            <aside className="lg:col-span-4">
              <h3 className="mb-3 text-xl font-bold tracking-tight text-slate-900 md:mb-4">
                Quick Eco-Tips
              </h3>
              <div className="space-y-2.5">
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

          <section className="mb-6 grid grid-cols-1 gap-5 lg:grid-cols-12 md:mb-7">
            <div className="lg:col-span-8">
              <SimulationCard
                current={weekly}
                after={projectedAfter}
                saved={savedWeekly}
              />
            </div>
            <div className="surface-card self-start border-slate-200 bg-white p-5 shadow-sm lg:col-span-4">
              <h3 className="mb-2 text-lg font-bold text-slate-900 md:text-xl">
                Did you know?
              </h3>
              <p className="text-sm text-slate-600">
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
      </main>
    </div>
  );
};

export default SuggestionsPage;
