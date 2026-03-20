import React from "react";
import { Brain, RotateCcw } from "lucide-react";

const PageHeader = ({ onRecalculate }) => (
  <section className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
    <div>
      <div className="mb-2 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
          <Brain className="h-5 w-5 text-slate-700" />
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          AI Sustainability Suggestions
        </h1>
      </div>
      <p className="text-slate-500">
        Personalized recommendations based on your carbon footprint analysis.
      </p>
    </div>
    <button
      onClick={onRecalculate}
      className="btn-secondary gap-2 px-6 py-3"
    >
      <RotateCcw className="h-4 w-4" />
      Recalculate Insights
    </button>
  </section>
);

export default PageHeader;
