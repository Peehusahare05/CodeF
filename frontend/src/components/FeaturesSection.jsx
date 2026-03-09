// FeaturesSection.jsx
import React from "react";
import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: (
      <svg
        className="w-8 h-8 text-green-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
      </svg>
    ),
    title: "Carbon Calculator",
    desc: "See detailed view of your CO₂ output based on lifestyle.",
  },
  {
    icon: (
      <svg
        className="w-8 h-8 text-blue-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 16h-1v-4h-1m4 0h-1v-4h-1m4 0h-1v-4h-1"
        />
      </svg>
    ),
    title: "AI Advisor",
    desc: "Get real-time smart advice for eco-friendly decision making.",
  },
  {
    icon: (
      <svg
        className="w-8 h-8 text-yellow-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <rect width="20" height="12" x="2" y="6" rx="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h20" />
      </svg>
    ),
    title: "Reduction Simulator",
    desc: "Simulate and compare lifestyle changes to impact your future scores.",
  },
  {
    icon: (
      <svg
        className="w-8 h-8 text-green-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 17l4-4 4 4m0 0V7m0 10H8"
        />
      </svg>
    ),
    title: "Leaderboard",
    desc: "Compete with friends. See local & global community members.",
  },
];

const FeaturesSection = () => (
  <section className="py-20 px-4 bg-white" id="features">
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {features.map((f, i) => (
          <FeatureCard key={i} icon={f.icon} title={f.title} desc={f.desc} />
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
