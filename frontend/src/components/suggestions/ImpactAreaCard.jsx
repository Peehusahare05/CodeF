import React from "react";
import { CarFront } from "lucide-react";

const ImpactAreaCard = ({ category = "Transportation", share = 45 }) => (
  <div className="bg-white rounded-2xl shadow-md p-6">
    <h3 className="text-xl font-bold text-slate-900 mb-5">
      Your Highest Impact Area
    </h3>
    <div className="flex items-center gap-3 mb-4">
      <span className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
        <CarFront className="w-5 h-5 text-green-600" />
      </span>
      <div>
        <p className="text-xs text-slate-400 font-semibold">Top Category</p>
        <p className="text-lg font-bold text-slate-900">{category}</p>
      </div>
    </div>

    <div className="mb-2 flex items-center justify-between text-sm">
      <span className="text-slate-500">Footprint Share</span>
      <span className="font-semibold text-green-600">{share}%</span>
    </div>
    <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-4">
      <div
        className="h-full bg-gradient-to-r from-green-600 to-green-400 rounded-full"
        style={{ width: `${share}%` }}
      />
    </div>
    <p className="text-xs text-slate-400 italic">
      "Focusing on transit habits could improve your score by 15 points."
    </p>
  </div>
);

export default ImpactAreaCard;
