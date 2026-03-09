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
  <article className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5">
    <div className="flex items-center justify-between mb-4">
      <span className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
        {icon}
      </span>
      <span
        className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded-full font-bold ${impactStyles[impact]}`}
      >
        {impact} impact
      </span>
    </div>
    <h4 className="text-2xl font-bold text-slate-900 mb-2">{title}</h4>
    <p className="text-slate-500 text-sm mb-5">{description}</p>
    <button className="rounded-full bg-green-100 text-green-700 px-4 py-2 text-xs font-bold">
      {reduction}
    </button>
  </article>
);

export default RecommendationCard;
