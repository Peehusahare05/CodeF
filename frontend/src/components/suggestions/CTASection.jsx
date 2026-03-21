import React from "react";

const CTASection = ({ onApply, onViewDashboard }) => (
  <section className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4 lg:p-6">
    <div className="flex flex-col items-start justify-between gap-3 sm:gap-4 lg:gap-6 md:flex-row md:items-center">
      <div>
        <h3 className="mb-2 text-lg font-bold tracking-tight text-slate-900 sm:text-xl lg:text-2xl">
          Ready to Take Action?
        </h3>
        <p className="text-xs text-slate-600 sm:text-sm">
          Apply these suggestions and monitor your weekly footprint improvements.
        </p>
      </div>

      <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
        <button onClick={onApply} className="btn-primary w-full rounded-2xl px-6 py-3 text-xs sm:w-auto sm:px-8 sm:text-sm">
          Apply Suggestions
        </button>
        <button onClick={onViewDashboard} className="btn-secondary w-full rounded-2xl px-6 py-3 text-xs sm:w-auto sm:px-8 sm:text-sm">
          View Dashboard
        </button>
      </div>
    </div>
  </section>
);

export default CTASection;
