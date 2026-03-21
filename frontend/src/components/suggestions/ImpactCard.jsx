import React from "react";
import { Activity, Leaf, TrendingUp } from "lucide-react";

const ImpactCard = ({ weekly = 42, ecoScore = 72, topCategory = "Transportation" }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4 lg:p-6">
    <div className="mb-4 flex items-center justify-between gap-3">
      <div>
        <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl lg:text-2xl">Suggestions Summary</h2>
        <p className="mt-1 text-xs text-slate-500 sm:text-sm">Key signals from your latest footprint analysis</p>
      </div>
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-green-50 text-green-700 sm:h-10 sm:w-10">
        <Activity className="h-4 w-4 sm:h-5 sm:w-5" />
      </span>
    </div>

    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
      <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Total CO2</p>
        <p className="mt-2 text-xl font-extrabold text-slate-900 sm:text-2xl lg:text-3xl">{weekly}</p>
        <p className="text-xs font-medium text-slate-500 sm:text-sm">kg/week</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Eco Score</p>
        <p className="mt-2 text-xl font-extrabold text-green-700 sm:text-2xl lg:text-3xl">{ecoScore}</p>
        <p className="text-xs font-medium text-slate-500 sm:text-sm">out of 100</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4 col-span-2 md:col-span-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Top Category</p>
        <p className="mt-2 truncate text-lg font-bold text-slate-900 sm:text-xl lg:text-2xl">{topCategory}</p>
        <div className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600">
          <TrendingUp className="h-3.5 w-3.5" />
          Highest contributor
        </div>
      </div>
    </div>

    <div className="mt-4 inline-flex max-w-full items-center gap-2 rounded-full border border-green-100 bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700 sm:text-sm">
      <Leaf className="h-3.5 w-3.5" />
      <span className="truncate">Prioritize {topCategory.toLowerCase()} suggestions for fastest weekly reduction</span>
    </div>
  </div>
);

export default ImpactCard;
