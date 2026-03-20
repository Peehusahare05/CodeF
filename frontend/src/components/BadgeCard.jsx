import React from "react";

const BadgeCard = ({ icon, title, desc }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_8px_24px_-20px_rgba(15,23,42,0.5)]">
    <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600">
      {icon}
    </div>
    <p className="text-sm font-semibold text-slate-900">{title}</p>
    <p className="mt-1 text-xs text-slate-500">{desc}</p>
  </div>
);

export default BadgeCard;
