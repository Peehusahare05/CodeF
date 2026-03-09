// ProblemSection.jsx
import React from "react";
import { Car, Zap, Recycle } from "lucide-react";

const problems = [
  {
    icon: <Car className="w-7 h-7 text-green-600" strokeWidth={2.2} />,
    title: "Car Travel",
    text: "Personal transportation accounts for nearly 15% of global carbon emissions. Cutting your commute saves tons of CO₂ yearly.",
    bg: "bg-green-50 hover:bg-green-100",
  },
  {
    icon: <Zap className="w-7 h-7 text-yellow-500" strokeWidth={2.2} />,
    title: "Electricity",
    text: "Household energy consumption is a major footprint driver. Smart monitoring helps reduce phantom loads and waste.",
    bg: "bg-yellow-50 hover:bg-yellow-100",
  },
  {
    icon: <Recycle className="w-7 h-7 text-blue-500" strokeWidth={2.2} />,
    title: "Plastic Waste",
    text: "The average person generates 1.5kg of waste daily. Tracking plastic use helps transition to a circular lifestyle.",
    bg: "bg-blue-50 hover:bg-blue-100",
  },
];

const ProblemSection = () => (
  <section className="py-20 px-4 bg-white" id="problem">
    <h2 className="text-3xl md:text-4xl font-extrabold text-center text-slate-900 mb-12 tracking-tight">
      Why Personal Sustainability Matters
    </h2>
    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      {problems.map((p, i) => (
        <div
          key={i}
          className={`rounded-2xl ${p.bg} shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-8 flex flex-col items-center text-center cursor-pointer`}
        >
          <div className="mb-4 flex items-center justify-center w-14 h-14 rounded-full bg-white/70 shadow-inner backdrop-blur">
            {p.icon}
          </div>
          <h3 className="font-bold text-lg mb-2 text-slate-800">{p.title}</h3>
          <p className="text-slate-600 text-sm">{p.text}</p>
        </div>
      ))}
    </div>
  </section>
);

export default ProblemSection;
