import React from "react";

const ScoreRing = ({ score, tone }) => {
    const radius = 34;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;
    const colorMap = {
        emerald: "#059669",
        amber: "#d97706",
        rose: "#e11d48",
        blue: "#2563eb",
        slate: "#334155",
    };
    const color = colorMap[tone] || colorMap.slate;

    return (
        <svg width="84" height="84" viewBox="0 0 84 84">
            <circle cx="42" cy="42" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="8" />
            <circle
                cx="42"
                cy="42"
                r={radius}
                fill="none"
                stroke={color}
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                transform="rotate(-90 42 42)"
            />
            <text x="42" y="45" textAnchor="middle" fontSize="16" fontWeight="700" fill={color}>
                {score}
            </text>
        </svg>
    );
};

const MetricCard = ({
    title,
    value,
    subtitle,
    trend,
    tone = "slate",
    Icon,
    size = "default",
    variant = "default",
    score,
}) => {
    const toneStyles = {
        emerald: "bg-emerald-50 text-emerald-700",
        blue: "bg-blue-50 text-blue-700",
        amber: "bg-amber-50 text-amber-700",
        rose: "bg-rose-50 text-rose-700",
        slate: "bg-slate-100 text-slate-700",
    };

    const trendTone = trend?.isPositive ? "text-emerald-600" : "text-rose-500";
    const sizeClass =
        size === "primary"
            ? "min-h-[220px] p-7 sm:p-8"
            : "p-5 sm:p-6";
    const isScore = variant === "score";

    return (
        <article
            className={`group rounded-3xl border border-slate-200/80 bg-white shadow-[0_18px_36px_-30px_rgba(15,23,42,0.75)] transition-all hover:-translate-y-0.5 hover:shadow-[0_24px_44px_-28px_rgba(15,23,42,0.4)] ${sizeClass}`}
        >
            {isScore ? (
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400">
                            {title}
                        </p>
                        <p className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">{value}</p>
                        {subtitle ? <p className="mt-1 text-sm text-slate-500">{subtitle}</p> : null}
                    </div>
                    <ScoreRing score={score ?? 0} tone={tone} />
                </div>
            ) : (
                <>
                    <div className="mb-4 flex items-start justify-between gap-3">
                        <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400">
                                {title}
                            </p>
                            <p className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">{value}</p>
                        </div>
                        {Icon ? (
                            <span className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${toneStyles[tone] || toneStyles.slate}`}>
                                <Icon className="h-5 w-5" />
                            </span>
                        ) : null}
                    </div>

                    {subtitle ? <p className="text-sm text-slate-500">{subtitle}</p> : null}
                </>
            )}

            {trend ? <p className={`mt-2 text-sm font-semibold ${trendTone}`}>{trend.label}</p> : null}
        </article>
    );
};

export default MetricCard;
