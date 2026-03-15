import React from "react";
import { AlertCircle } from "lucide-react";

const ImpactCard = ({ weekly = 42, ecoScore = 72, insight }) => (
  <div className="surface-card border-l-4 border-l-green-600 p-6">
    <h2 className="text-xl font-bold text-slate-900 mb-5">
      Your Current Environmental Impact
    </h2>
    <div className="grid grid-cols-2 gap-6 mb-5">
      <div>
        <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
          Weekly Footprint
        </p>
        <p className="text-4xl font-extrabold text-slate-900">
          {weekly}{" "}
          <span className="text-lg text-slate-400 font-bold">
            kg CO2 / week
          </span>
        </p>
      </div>
      <div>
        <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
          Eco Score
        </p>
        <p className="text-4xl font-extrabold text-green-600">
          {ecoScore}{" "}
          <span className="text-lg text-slate-300 font-bold">/ 100</span>
        </p>
      </div>
    </div>
    <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
      <AlertCircle className="w-4 h-4 text-amber-500" />
      <p className="text-sm text-slate-700">{insight}</p>
    </div>
  </div>
);

export default ImpactCard;
