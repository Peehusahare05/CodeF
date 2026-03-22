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

    <div className="grid grid-cols-[repeat(3,minmax(0,1fr))] gap-2.5 sm:gap-4">
      <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-2.5 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-4">
        <p className="truncate text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400 sm:text-[11px]">Total CO2</p>
        <p className="mt-1.5 truncate text-base font-extrabold text-slate-900 sm:mt-2 sm:text-2xl lg:text-3xl">{weekly}</p>
        <p className="truncate text-[10px] font-medium text-slate-500 sm:text-sm">kg/week</p>
      </div>

      <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-2.5 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-4">
        <p className="truncate text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400 sm:text-[11px]">Eco Score</p>
        <p className="mt-1.5 truncate text-base font-extrabold text-green-700 sm:mt-2 sm:text-2xl lg:text-3xl">{ecoScore}</p>
        <p className="truncate text-[10px] font-medium text-slate-500 sm:text-sm">out of 100</p>
      </div>

      <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-2.5 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-4">
        <p className="truncate text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400 sm:text-[11px]">Top Category</p>
        <p className="mt-1.5 truncate text-sm font-bold text-slate-900 sm:mt-2 sm:text-xl lg:text-2xl">{topCategory}</p>
        <div className="mt-1 flex min-w-0 items-center gap-1 text-[10px] font-semibold text-amber-600 sm:text-xs">
          <TrendingUp className="h-3.5 w-3.5 flex-shrink-0" />
          <span className="truncate">Highest contributor</span>
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
