import React from "react";

const impactStyles = {
  high: {
    badge: "border-red-200 bg-red-50 text-red-700",
    iconWrap: "bg-red-50 text-red-700 ring-red-100",
    label: "HIGH IMPACT",
  },
  medium: {
    badge: "border-amber-200 bg-amber-50 text-amber-700",
    iconWrap: "bg-amber-50 text-amber-700 ring-amber-100",
    label: "MEDIUM IMPACT",
  },
  low: {
    badge: "border-emerald-200 bg-emerald-50 text-emerald-700",
    iconWrap: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    label: "LOW IMPACT",
  },
};

const RecommendationCard = ({
  icon,
  impact = "medium",
  title,
  description,
  reduction,
}) => {
  const tone = impactStyles[impact] || impactStyles.medium;

  return (
    <article className="group h-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg sm:p-5">
      <div className="mb-4 flex flex-row items-center justify-between gap-3 sm:mb-5">
        <span
          className={`inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ring-1 ${tone.iconWrap} sm:h-11 sm:w-11`}
          aria-hidden="true"
        >
          {icon}
        </span>

        <span
          className={`inline-flex max-w-full flex-shrink-0 items-center rounded-full border px-2.5 py-1 text-[10px] font-semibold leading-none tracking-[0.12em] sm:px-3 sm:text-[11px] ${tone.badge}`}
        >
          {tone.label}
        </span>
      </div>

      <h4 className="mb-2 text-base font-bold tracking-tight text-slate-900 sm:text-lg lg:text-xl">
        {title}
      </h4>

      <p className="mb-5 line-clamp-3 text-xs leading-relaxed text-slate-600 sm:mb-6 sm:text-sm">
        {description}
      </p>

      <span className="inline-flex max-w-full items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 sm:px-4 sm:text-sm">
        <span className="truncate">{reduction}</span>
      </span>
    </article>
  );
};

export default RecommendationCard;
