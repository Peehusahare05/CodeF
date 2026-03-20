import React from "react";

const EcoTipCard = ({ icon, tip }) => (
  <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 transition-colors hover:bg-slate-50">
    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100">
      {icon}
    </span>
    <p className="text-sm text-slate-600">{tip}</p>
  </div>
);

export default EcoTipCard;
