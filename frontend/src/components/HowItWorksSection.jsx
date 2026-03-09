// HowItWorksSection.jsx
import React from "react";

const steps = [
  {
    icon: (
      <div className="bg-green-100 text-green-600 w-12 h-12 flex items-center justify-center rounded-full mb-3 text-2xl">
        1
      </div>
    ),
    title: "Enter Data",
    desc: "Log daily activities as our smart driver.",
  },
  {
    icon: (
      <div className="bg-blue-100 text-blue-500 w-12 h-12 flex items-center justify-center rounded-full mb-3 text-2xl">
        2
      </div>
    ),
    title: "AI Analysis",
    desc: "Our engine processes your habits against global benchmarks.",
  },
  {
    icon: (
      <div className="bg-yellow-100 text-yellow-500 w-12 h-12 flex items-center justify-center rounded-full mb-3 text-2xl">
        3
      </div>
    ),
    title: "Get Score",
    desc: "Receive a detailed Eco Score and impact breakdown.",
  },
  {
    icon: (
      <div className="bg-green-100 text-green-600 w-12 h-12 flex items-center justify-center rounded-full mb-3 text-2xl">
        4
      </div>
    ),
    title: "Smart Suggestions",
    desc: "Get personalized tips to reduce your footprint efficiently.",
  },
];

const HowItWorksSection = () => (
  <section className="py-20 px-4 bg-green-50" id="how">
    <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-2">
      How It Works
    </h2>
    <p className="text-center text-slate-600 mb-12">
      Transforming your lifestyle in four simple steps.
    </p>
    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
      {steps.map((step, i) => (
        <div key={i} className="flex flex-col items-center text-center">
          {step.icon}
          <h3 className="font-semibold text-lg mb-1 text-slate-800">
            {step.title}
          </h3>
          <p className="text-slate-600 text-sm">{step.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default HowItWorksSection;
