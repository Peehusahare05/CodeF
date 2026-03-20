import React from "react";

const impactStyles = {
  high: "bg-red-50 text-red-700 border-red-200",
  medium: "bg-amber-50 text-amber-700 border-amber-200",
  low: "bg-green-50 text-green-700 border-green-200",
};

const RecommendationCard = ({
  icon,
  impact = "medium",
  title,
  description,
  reduction,
}) => (
  <article className="surface-card h-full p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md md:p-6">
    <div className="flex items-center justify-between mb-4">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
        {icon}
      </span>
      <span
        className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] ${impactStyles[impact]}`}
      >
        {impact} impact
      </span>
    </div>
    <h4 className="mb-2 text-xl font-bold tracking-tight text-slate-900">{title}</h4>
    <p className="mb-6 text-sm leading-relaxed text-slate-500">{description}</p>
    <button className="rounded-full border border-green-200 bg-green-50 px-4 py-2 text-xs font-semibold text-green-700">
      {reduction}
    </button>
  </article>
);

export default RecommendationCard;
