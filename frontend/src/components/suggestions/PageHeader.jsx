import React from "react";
import { Brain, RotateCcw } from "lucide-react";

const PageHeader = ({ onRecalculate }) => (
  <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
    <div>
      <div className="flex items-center gap-3 mb-2">
        <span className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
          <Brain className="w-5 h-5 text-green-700" />
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900">
          AI Sustainability Suggestions
        </h1>
      </div>
      <p className="text-slate-500">
        Personalized recommendations based on your carbon footprint analysis.
      </p>
    </div>
    <button
      onClick={onRecalculate}
      className="inline-flex items-center gap-2 rounded-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 shadow-md hover:shadow-lg transition-all duration-300 font-semibold"
    >
      <RotateCcw className="w-4 h-4" />
      Recalculate Insights
    </button>
  </section>
);

export default PageHeader;
