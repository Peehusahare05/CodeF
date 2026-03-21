import React from "react";

const StatCard = ({ icon, title, value }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4 lg:p-5">
    <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600 sm:mb-3 sm:h-9 sm:w-9">
      {icon}
    </div>
    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">{title}</p>
    <p className="mt-1.5 break-words text-base font-bold text-slate-900 sm:text-lg lg:text-xl">{value}</p>
  </div>
);

export default StatCard;
