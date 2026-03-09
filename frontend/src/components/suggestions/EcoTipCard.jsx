import React from "react";

const EcoTipCard = ({ icon, tip }) => (
  <div className="rounded-xl bg-slate-50 border border-slate-100 px-4 py-3 flex items-center gap-3 hover:shadow-md transition-all duration-300">
    <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
      {icon}
    </span>
    <p className="text-sm text-slate-700">{tip}</p>
  </div>
);

export default EcoTipCard;
