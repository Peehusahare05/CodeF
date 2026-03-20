import React from "react";

const CTASection = ({ onApply, onViewDashboard }) => (
  <section className="surface-card border-slate-200 bg-white p-6 shadow-sm md:p-8">
    <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
      <div>
        <h3 className="mb-2 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
          Ready to Take Action?
        </h3>
        <p className="text-sm text-slate-600 md:text-base">
          Apply these suggestions and monitor your weekly footprint improvements.
        </p>
      </div>

      <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
        <button onClick={onApply} className="btn-primary rounded-2xl px-8 py-3">
          Apply Suggestions
        </button>
        <button onClick={onViewDashboard} className="btn-secondary rounded-2xl px-8 py-3">
          View Dashboard
        </button>
      </div>
    </div>
  </section>
);

export default CTASection;
