import React from "react";

const SimulationCard = ({ current = 42, after = 30, saved = 12 }) => {
  const progress = Math.max(0, Math.min(100, (saved / (current || 1)) * 100));
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4 lg:p-6">
      <div className="mb-4 flex items-center justify-between gap-3 sm:mb-5">
        <h3 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl lg:text-2xl">Impact Change</h3>
        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
          -{saved} kg CO2
        </span>
      </div>

      <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 sm:p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
            Before
          </p>
          <p className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl lg:text-4xl">{current}</p>
          <p className="text-xs font-medium text-slate-500 sm:text-sm">kg CO2 / week</p>
        </div>

        <div className="rounded-xl border border-green-200 bg-green-50 p-3 sm:p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-green-700">
            After Suggestions
          </p>
          <p className="mt-2 text-2xl font-extrabold text-green-700 sm:text-3xl lg:text-4xl">{after}</p>
          <p className="text-xs font-medium text-green-700/80 sm:text-sm">kg CO2 / week</p>
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between text-xs font-semibold text-slate-500">
          <span>Estimated Reduction</span>
          <span>{progress.toFixed(0)}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-green-600"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default SimulationCard;
