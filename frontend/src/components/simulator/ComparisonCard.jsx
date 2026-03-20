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
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_14px_34px_-28px_rgba(15,23,42,0.75)] sm:p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500">Current</p>
                    <p className="mt-1 text-3xl font-bold text-slate-900 sm:text-4xl">{currentCO2.toFixed(2)}</p>
                    <p className="text-sm text-slate-500">kg CO₂ / week</p>
                    <p className="mt-2 text-sm font-medium text-slate-700">Eco Score: {currentScore}</p>
                </div>

                <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500">
                    <ArrowRight className="h-4 w-4" />
                </div>

                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-emerald-700">Projected</p>
                    <div className="mt-1 flex items-end gap-2">
                        <p className="text-3xl font-bold text-slate-900 sm:text-4xl">{projectedCO2.toFixed(2)}</p>
                        <span className="mb-1 text-xs font-semibold text-emerald-700">-{co2Delta.toFixed(2)} kg</span>
                    </div>
                    <p className="text-sm text-slate-500">kg CO₂ / week</p>
                    <p className="mt-2 text-sm font-medium text-slate-700">Eco Score: {projectedScore} <span className="text-emerald-700">(+{ecoDelta})</span></p>
                </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm sm:grid-cols-3">
                <div>
                    <p className="text-xs text-slate-500">Weekly Reduction</p>
                    <p className="font-semibold text-emerald-700">{co2Delta.toFixed(2)} kg</p>
                </div>
                <div>
                    <p className="text-xs text-slate-500">Improvement</p>
                    <p className="font-semibold text-emerald-700">{reductionPercent.toFixed(1)}%</p>
                </div>
                <div>
                    <p className="text-xs text-slate-500">Eco Score Gain</p>
                    <p className="font-semibold text-emerald-700">+{ecoDelta}</p>
                </div>
            </div>
        </section>
    );
};

export default ComparisonCard;
