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
  <section className="py-20 px-4 bg-green-50/50" id="how">
    <div className="text-center mb-20">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 border border-green-200 text-green-700 text-sm font-bold tracking-wide uppercase mb-5 shadow-sm">
        <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
        Process
      </div>
      <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
        How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400">Works</span>
      </h2>
      <p className="text-lg text-slate-600 max-w-xl mx-auto">
        Transforming your lifestyle into measurable impact in four simple steps.
      </p>
    </div>
    <div className="max-w-6xl mx-auto relative">
      {/* Dashed line connecting steps (visible only on md+) */}
      <div className="hidden md:block absolute top-[24px] left-[12%] right-[12%] h-0.5 border-t-2 border-dashed border-green-200 -z-10"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        {steps.map((step, i) => (
          <div key={i} className="flex flex-col items-center text-center group cursor-default">
            
            {/* Step Number Circle */}
            <div className={`w-14 h-14 bg-white border-4 border-green-50 shadow-md text-slate-800 text-xl font-bold rounded-full flex items-center justify-center mb-6 z-10 group-hover:scale-110 group-hover:border-green-200 transition-all duration-300 relative`}>
              {i + 1}
              
              {/* Arrow pointer to right (hidden on last item and mobile) */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute -right-[4.5rem] top-1/2 -translate-y-1/2 w-8 text-green-300">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>

            <h3 className="font-extrabold text-lg mb-2 text-slate-800 group-hover:text-green-600 transition-colors">
              {step.title}
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed max-w-[200px]">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
