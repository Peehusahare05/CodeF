import React from "react";
import { Brain, RotateCcw } from "lucide-react";

const PageHeader = ({ onRecalculate }) => (
  <section className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4 lg:p-6">
    <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <div className="mb-2 flex items-center gap-2 sm:gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 sm:h-10 sm:w-10">
            <Brain className="h-5 w-5 text-slate-700" />
          </span>
          <h1 className="text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl lg:text-2xl">
            AI Sustainability Suggestions
          </h1>
        </div>
        <p className="text-xs text-slate-500 sm:text-sm">
          Personalized recommendations based on your carbon footprint analysis.
        </p>
      </div>
      <button
        onClick={onRecalculate}
        className="btn-secondary inline-flex w-full items-center justify-center gap-2 px-4 py-2.5 text-xs sm:w-auto sm:px-6 sm:py-3 sm:text-sm"
      >
        <RotateCcw className="h-4 w-4" />
        Recalculate Insights
      </button>
    </div>
  </section>
);

export default PageHeader;
