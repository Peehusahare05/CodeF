import React from "react";
import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section>
      <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4 lg:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 sm:text-xl lg:text-2xl">Ready to climb the rankings?</h3>
            <p className="mt-1 text-xs text-slate-500 sm:text-sm">Track one week of activity to improve your eco score.</p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <button
              type="button"
              onClick={() => navigate("/track")}
              className="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 sm:w-auto"
            >
              Start Tracking
            </button>
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="inline-flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 sm:w-auto"
            >
              View Dashboard
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
