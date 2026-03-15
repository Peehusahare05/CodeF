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
    targetRoute: "/track",
  },
  {
    icon: <Brain className="w-7 h-7 text-blue-500" strokeWidth={2.2} />,
    title: "AI Advisor",
    desc: "Get real-time smart advice for eco-friendly decision making.",
    iconBg: "bg-blue-50 group-hover:bg-blue-100",
    targetRoute: "/track?feature=advisor",
  },
  {
    icon: <BarChart3 className="w-7 h-7 text-yellow-500" strokeWidth={2.2} />,
    title: "Reduction Simulator",
    desc: "Simulate and compare lifestyle changes to impact your future scores.",
    iconBg: "bg-yellow-50 group-hover:bg-yellow-100",
    targetRoute: "/track?feature=simulator",
  },
  {
    icon: <Trophy className="w-7 h-7 text-green-400" strokeWidth={2.2} />,
    title: "Leaderboard",
    desc: "Compete with friends. See local & global community members.",
    iconBg: "bg-green-100 group-hover:bg-green-200",
    targetRoute: "/leaderboard",
  },
];

const FeaturesSection = () => (
  <section className="bg-white py-16" id="features">
    <div className="section-wrap">
      <div className="mb-12 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-100 bg-green-50 px-3 py-1 text-xs font-semibold tracking-wide text-green-700">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
          Core Features
        </div>
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          Powerful <span className="text-green-700">Sustainability</span> Tools
        </h2>
        <p className="mx-auto max-w-2xl text-base text-slate-500 md:text-lg">
          Explore intelligent tools designed to help you measure, analyze, and improve your environmental impact.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {features.map((f, i) => (
          <FeatureCard
            key={i}
            icon={f.icon}
            title={f.title}
            desc={f.desc}
            iconBg={f.iconBg}
            targetRoute={f.targetRoute}
          />
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
