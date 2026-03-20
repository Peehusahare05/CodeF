import React from "react";

const StatCard = ({ icon, title, value }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_24px_-18px_rgba(15,23,42,0.45)]">
    <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600">
      {icon}
    </div>
    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">{title}</p>
    <p className="mt-1.5 text-2xl font-bold text-slate-900">{value}</p>
  </div>
);

export default StatCard;
