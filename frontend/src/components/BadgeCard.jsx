import React from "react";

const BadgeCard = ({ icon, title, desc }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
    <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600 sm:h-9 sm:w-9">
      {icon}
    </div>
    <p className="text-xs font-semibold text-slate-900 sm:text-sm">{title}</p>
    <p className="mt-1 text-xs text-slate-500 sm:text-sm">{desc}</p>
  </div>
);

export default BadgeCard;
