import React from "react";
import { ArrowRight } from "lucide-react";

const ComparisonCard = ({
    currentCO2,
    projectedCO2,
    currentScore,
    projectedScore,
    reductionPercent,
}) => {
    const co2Delta = Math.max(0, currentCO2 - projectedCO2);
    const ecoDelta = Math.max(0, projectedScore - currentScore);

    return (
        <section className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:rounded-xl sm:p-4 lg:rounded-2xl lg:p-6">
            {/* Current vs Projected Cards */}
            <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
                {/* Current Card */}
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 sm:rounded-xl sm:p-4 lg:p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Current</p>
                    <p className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
                        {currentCO2.toFixed(2)}
                    </p>
                    <p className="text-xs text-slate-500 sm:text-sm">kg CO₂ / week</p>
                    <p className="mt-2 text-xs font-medium text-slate-700 sm:text-sm">
                        Eco Score: {currentScore}
                    </p>
                </div>

                {/* Arrow (hidden on mobile) */}
                <div className="hidden md:mx-auto md:inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500">
                    <ArrowRight className="h-4 w-4" />
                </div>

                {/* Projected Card */}
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 sm:rounded-xl sm:p-4 lg:p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-emerald-700">Projected</p>
                    <div className="mt-2 flex items-end gap-2">
                        <p className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
                            {projectedCO2.toFixed(2)}
                        </p>
                        <span className="mb-1 text-xs font-semibold text-emerald-700">-{co2Delta.toFixed(2)} kg</span>
                    </div>
                    <p className="text-xs text-slate-500 sm:text-sm">kg CO₂ / week</p>
                    <p className="mt-2 text-xs font-medium text-slate-700 sm:text-sm">
                        Eco Score: {projectedScore} <span className="text-emerald-700">(+{ecoDelta})</span>
                    </p>
                </div>
            </div>

            {/* Metrics Row */}
            <div className="mt-3 grid grid-cols-2 gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 sm:gap-4 sm:rounded-xl sm:p-4 md:grid-cols-3 lg:gap-6 lg:p-5">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Weekly Reduction</p>
                    <p className="mt-1 text-base font-semibold text-emerald-700 sm:text-lg lg:text-xl">
                        {co2Delta.toFixed(2)} <span className="text-xs sm:text-sm">kg</span>
                    </p>
                </div>
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Improvement</p>
                    <p className="mt-1 text-base font-semibold text-emerald-700 sm:text-lg lg:text-xl">
                        {reductionPercent.toFixed(1)}%
                    </p>
                </div>
                <div className="col-span-2 sm:col-span-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Score Gain</p>
                    <p className="mt-1 text-base font-semibold text-emerald-700 sm:text-lg lg:text-xl">
                        +{ecoDelta}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ComparisonCard;
