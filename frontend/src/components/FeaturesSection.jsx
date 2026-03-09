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
  <section className="py-20 px-4 bg-white" id="features">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 border border-green-100 text-green-700 text-sm font-bold tracking-wide uppercase mb-5 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Core Features
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
          Powerful <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400">Sustainability</span> Tools
        </h2>
        <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto">
          Explore intelligent tools designed to help you measure, analyze, and improve your environmental impact.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
