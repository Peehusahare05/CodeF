import React from "react";

const EcoTipCard = ({ icon, tip }) => (
  <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition-colors hover:bg-slate-50 sm:p-4">
    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-slate-100">
      {icon}
    </span>
    <p className="text-xs text-slate-600 sm:text-sm">{tip}</p>
  </div>
);

export default EcoTipCard;
