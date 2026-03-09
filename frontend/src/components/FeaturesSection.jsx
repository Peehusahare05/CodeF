// FeaturesSection.jsx
import React from "react";
import FeatureCard from "./FeatureCard";
import { Calculator, Brain, BarChart3, Trophy } from "lucide-react";

const features = [
  {
    icon: <Calculator className="w-7 h-7 text-green-600" strokeWidth={2.2} />,
    title: "Carbon Calculator",
    desc: "See detailed view of your CO₂ output based on lifestyle.",
    iconBg: "bg-green-50 group-hover:bg-green-100",
  },
  {
    icon: <Brain className="w-7 h-7 text-blue-500" strokeWidth={2.2} />,
    title: "AI Advisor",
    desc: "Get real-time smart advice for eco-friendly decision making.",
    iconBg: "bg-blue-50 group-hover:bg-blue-100",
  },
  {
    icon: <BarChart3 className="w-7 h-7 text-yellow-500" strokeWidth={2.2} />,
    title: "Reduction Simulator",
    desc: "Simulate and compare lifestyle changes to impact your future scores.",
    iconBg: "bg-yellow-50 group-hover:bg-yellow-100",
  },
  {
    icon: <Trophy className="w-7 h-7 text-green-400" strokeWidth={2.2} />,
    title: "Leaderboard",
    desc: "Compete with friends. See local & global community members.",
    iconBg: "bg-green-100 group-hover:bg-green-200",
  },
];

const FeaturesSection = () => (
  <section className="py-20 px-4 bg-white" id="features">
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {features.map((f, i) => (
          <FeatureCard
            key={i}
            icon={f.icon}
            title={f.title}
            desc={f.desc}
            iconBg={f.iconBg}
          />
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
