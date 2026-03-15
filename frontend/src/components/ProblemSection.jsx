// ProblemSection.jsx
import React from "react";
import { Car, Zap, Recycle } from "lucide-react";

const problems = [
  {
    icon: <Car className="w-7 h-7 text-green-600" strokeWidth={2.2} />,
    title: "Car Travel",
    text: "Personal transportation accounts for nearly 15% of global carbon emissions. Cutting your commute saves tons of CO₂ yearly.",
    bg: "bg-green-50",
  },
  {
    icon: <Zap className="w-7 h-7 text-yellow-500" strokeWidth={2.2} />,
    title: "Electricity",
    text: "Household energy consumption is a major footprint driver. Smart monitoring helps reduce phantom loads and waste.",
    bg: "bg-yellow-50",
  },
  {
    icon: <Recycle className="w-7 h-7 text-blue-500" strokeWidth={2.2} />,
    title: "Plastic Waste",
    text: "The average person generates 1.5kg of waste daily. Tracking plastic use helps transition to a circular lifestyle.",
    bg: "bg-blue-50",
  },
];

const ProblemSection = () => (
  <section className="bg-white py-16" id="problem">
    <div className="section-wrap">
      <div className="mb-12 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold tracking-wide text-blue-700">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
          Global Impact
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          Why Personal <span className="text-green-700">Sustainability</span> Matters
        </h2>
      </div>
      <div className="grid max-w-5xl grid-cols-1 gap-6 mx-auto md:grid-cols-3">
        {problems.map((p, i) => (
          <div
            key={i}
            className={`surface-card ${p.bg} p-6 text-center`}
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white">
              {p.icon}
            </div>
            <h3 className="mb-2 text-lg font-semibold text-slate-800">{p.title}</h3>
            <p className="text-slate-600 text-sm">{p.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ProblemSection;
