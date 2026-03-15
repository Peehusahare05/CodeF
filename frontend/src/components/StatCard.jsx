import React from "react";

const StatCard = ({ icon, title, value, iconBg }) => (
  <div className="surface-card flex items-center gap-4 p-6">
    <div
      className={`flex h-12 w-12 items-center justify-center rounded-full ${iconBg}`}
    >
      {icon}
    </div>
    <div>
      <div className="text-xs font-semibold text-slate-500 mb-1">{title}</div>
      <div className="text-2xl font-extrabold text-slate-900">{value}</div>
    </div>
  </div>
);

export default StatCard;
