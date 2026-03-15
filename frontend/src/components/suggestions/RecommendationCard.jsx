import React from "react";

const impactStyles = {
  high: "bg-red-100 text-red-700",
  medium: "bg-amber-100 text-amber-700",
  low: "bg-blue-100 text-blue-700",
};

const RecommendationCard = ({
  icon,
  impact = "medium",
  title,
  description,
  reduction,
}) => (
  <article className="surface-card p-5 transition-colors hover:bg-gray-50">
    <div className="flex items-center justify-between mb-4">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
        {icon}
      </span>
      <span
        className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded-full font-bold ${impactStyles[impact]}`}
      >
        {impact} impact
      </span>
    </div>
    <h4 className="mb-2 text-xl font-semibold text-slate-900">{title}</h4>
    <p className="text-slate-500 text-sm mb-5">{description}</p>
    <button className="rounded-full border border-green-200 bg-green-50 px-4 py-2 text-xs font-semibold text-green-700">
      {reduction}
    </button>
  </article>
);

export default RecommendationCard;
