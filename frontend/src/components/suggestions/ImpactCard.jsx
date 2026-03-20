import React from "react";
import { Activity, Leaf, TrendingUp } from "lucide-react";

const ImpactCard = ({ weekly = 42, ecoScore = 72, topCategory = "Transportation" }) => (
  <div className="surface-card border-slate-200 p-5 shadow-sm md:p-6">
    <div className="mb-5 flex items-center justify-between gap-3">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Suggestions Summary</h2>
        <p className="mt-1 text-sm text-slate-500">Key signals from your latest footprint analysis</p>
      </div>
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-700">
        <Activity className="h-5 w-5" />
      </span>
    </div>

    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Total CO2</p>
        <p className="mt-2 text-3xl font-extrabold text-slate-900">{weekly}</p>
        <p className="text-xs font-medium text-slate-500">kg/week</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Eco Score</p>
        <p className="mt-2 text-3xl font-extrabold text-green-700">{ecoScore}</p>
        <p className="text-xs font-medium text-slate-500">out of 100</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Top Category</p>
        <p className="mt-2 text-2xl font-bold text-slate-900">{topCategory}</p>
        <div className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600">
          <TrendingUp className="h-3.5 w-3.5" />
          Highest contributor
        </div>
      </div>
    </div>

    <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-green-100 bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
      <Leaf className="h-3.5 w-3.5" />
      Prioritize {topCategory.toLowerCase()} suggestions for fastest weekly reduction
    </div>
  </div>
);

export default ImpactCard;
