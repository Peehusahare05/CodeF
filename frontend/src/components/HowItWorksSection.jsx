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
  <section className="bg-green-50/50 py-16" id="how">
    <div className="section-wrap">
      <div className="mb-10 text-center md:mb-14">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-100 px-3 py-1 text-xs font-semibold tracking-wide text-green-700">
          <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
          Process
        </div>
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-slate-900 md:text-4xl">
          How It <span className="text-green-700">Works</span>
        </h2>
        <p className="mx-auto max-w-xl text-base text-slate-600 md:text-lg">
          Transforming your lifestyle into measurable impact in four simple steps.
        </p>
      </div>
      <div className="relative max-w-6xl mx-auto">
        <div className="absolute left-[12%] right-[12%] top-[24px] -z-10 hidden h-0.5 border-t border-dashed border-green-200 md:block"></div>

        <div className="relative z-10 grid grid-cols-1 gap-10 md:grid-cols-4">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center">

              <div className="relative z-10 mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-green-100 bg-white text-lg font-semibold text-slate-800">
                {i + 1}

                {i < steps.length - 1 && (
                  <div className="absolute -right-[4.5rem] top-1/2 hidden w-8 -translate-y-1/2 text-green-300 md:block">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>

              <h3 className="mb-2 text-lg font-semibold text-slate-800">
                {step.title}
              </h3>
              <p className="w-full max-w-xs text-slate-500 text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
