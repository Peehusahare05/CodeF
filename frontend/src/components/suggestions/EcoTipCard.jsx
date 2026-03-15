import React from "react";

const EcoTipCard = ({ icon, tip }) => (
  <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 transition-colors hover:bg-slate-100">
    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
      {icon}
    </span>
    <p className="text-sm text-slate-700">{tip}</p>
  </div>
);

export default EcoTipCard;
