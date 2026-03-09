// ProblemSection.jsx
import React from "react";

const problems = [
  {
    icon: (
      <svg
        className="w-8 h-8 text-green-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 13l2-2m0 0l7-7 7 7M5 11v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6"
        />
      </svg>
    ),
    title: "Car Travel",
    text: "Personal transportation accounts for nearly 15% of global carbon emissions. Cutting your commute saves tons of CO₂ yearly.",
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
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.93l-.71-.71"
        />
      </svg>
    ),
    title: "Electricity",
    text: "Household energy consumption is a major footprint driver. Smart monitoring helps reduce phantom loads and waste.",
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
          d="M20 13V7a2 2 0 00-2-2H6a2 2 0 00-2 2v6m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6"
        />
      </svg>
    ),
    title: "Plastic Waste",
    text: "The average person generates 1.5kg of waste daily. Tracking plastic use helps transition to a circular lifestyle.",
  },
];

const ProblemSection = () => (
  <section className="py-20 px-4 bg-white" id="problem">
    <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12">
      Why Personal Sustainability Matters
    </h2>
    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      {problems.map((p, i) => (
        <div
          key={i}
          className="rounded-xl bg-green-50 hover:bg-green-100 shadow-md hover:shadow-lg transition p-8 flex flex-col items-center text-center cursor-pointer"
        >
          <div className="mb-4">{p.icon}</div>
          <h3 className="font-bold text-lg mb-2 text-slate-800">{p.title}</h3>
          <p className="text-slate-600 text-sm">{p.text}</p>
        </div>
      ))}
    </div>
  </section>
);

export default ProblemSection;
