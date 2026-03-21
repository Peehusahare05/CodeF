import React from "react";
import { TrendingDown, Zap } from "lucide-react";

const statusTone = {
    emerald: {
        text: "text-emerald-700",
        bg: "bg-emerald-50",
        border: "border-emerald-200",
        badge: "border-emerald-200 bg-emerald-50 text-emerald-700",
        badgeBg: "bg-emerald-100/30",
    },
    amber: {
        text: "text-amber-700",
        bg: "bg-amber-50",
        border: "border-amber-200",
        badge: "border-amber-200 bg-amber-50 text-amber-700",
        badgeBg: "bg-amber-100/30",
    },
    rose: {
        text: "text-rose-700",
        bg: "bg-rose-50",
        border: "border-rose-200",
        badge: "border-rose-200 bg-rose-50 text-rose-700",
        badgeBg: "bg-rose-100/30",
    },
};

const HeroSection = ({ total, impact, topContributor, trendLabel, ecoScore }) => {
    const tone = statusTone[impact.tone] || statusTone.amber;

    return (
        <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-slate-900/3 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-emerald-500/5 blur-3xl" />

            <div className="relative p-3 sm:p-4 lg:p-6">
                <div className="mb-3 sm:mb-4 lg:mb-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Carbon Storyline
                    </p>
                    <h1 className="mt-2 text-lg font-bold text-slate-900 sm:text-xl lg:text-2xl">
                        Your Carbon Footprint is {impact.label.replace(" Impact", "")}
                    </h1>
                    <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base lg:text-lg">
                        Electricity, transport, waste, and plastic patterns are combined into one weekly impact signal so you can act on what matters most.
                    </p>
                </div>

                <div className="mb-3 grid grid-cols-2 gap-3 sm:mb-4 sm:gap-4 md:grid-cols-4 lg:mb-6 lg:gap-6">
                    {/* Total CO2 */}
                    <div className="h-full rounded-xl border border-slate-100 bg-white p-3 shadow-sm sm:p-4 lg:p-5">
                        <div className="space-y-1">
                            <p className="truncate text-xs font-semibold uppercase tracking-[0.12em] text-slate-400 sm:text-sm lg:text-base">Total CO2</p>
                            <p className="text-sm font-black text-slate-900 sm:text-lg lg:text-xl">{total}</p>
                            <p className="text-xs font-medium text-slate-500 sm:text-sm lg:text-base">kg/week</p>
                        </div>
                    </div>

                    {/* Eco Score */}
                    <div className="h-full rounded-xl border border-blue-100 bg-white p-3 shadow-sm sm:p-4 lg:p-5">
                        <div className="space-y-1">
                            <p className="truncate text-xs font-semibold uppercase tracking-[0.12em] text-blue-600 sm:text-sm lg:text-base">Eco Score</p>
                            <p className="text-sm font-black text-blue-700 sm:text-lg lg:text-xl">{ecoScore}</p>
                            <p className="text-xs font-medium text-blue-600 sm:text-sm lg:text-base">/ 100</p>
                        </div>
                    </div>

                    {/* Impact Level */}
                    <div className={`h-full rounded-xl border ${tone.border} ${tone.badgeBg} p-3 shadow-sm sm:p-4 lg:p-5`}>
                        <div className="space-y-1">
                            <p className="truncate text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 sm:text-sm lg:text-base">Impact</p>
                            <p className={`truncate text-sm font-black sm:text-lg lg:text-xl ${tone.text}`}>{impact.label}</p>
                        </div>
                        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                            <div
                                className={`h-full ${tone.text.replace('text-', 'bg-')} rounded-full`}
                                style={{ width: impact.label === 'Low Impact' ? '33%' : impact.label === 'Moderate Impact' ? '66%' : '100%' }}
                            />
                        </div>
                    </div>

                    {/* Trend */}
                    <div className="h-full rounded-xl border border-emerald-100 bg-white p-3 shadow-sm sm:p-4 lg:p-5">
                        <div className="space-y-1">
                            <p className="truncate text-xs font-semibold uppercase tracking-[0.12em] text-emerald-600 sm:text-sm lg:text-base">Trend</p>
                            <div className="flex items-center gap-1.5">
                                <TrendingDown className="h-3.5 w-3.5 flex-shrink-0 text-emerald-600 sm:h-4 sm:w-4" />
                                <p className="truncate text-xs font-semibold text-emerald-700 sm:text-sm lg:text-base">{trendLabel}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Biggest Contributor */}
                {topContributor && (
                    <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-white p-3 shadow-sm sm:p-4 lg:p-6">
                        <div className="min-w-0 flex items-center gap-2">
                            <Zap className="h-4 w-4 flex-shrink-0 text-amber-500 sm:h-5 sm:w-5" />
                            <div className="min-w-0">
                                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 sm:text-sm">Biggest Contributor</p>
                                <p className="truncate text-sm font-bold text-slate-900 sm:text-base lg:text-lg">{topContributor.label}</p>
                            </div>
                        </div>
                        <div className="flex flex-shrink-0 items-baseline gap-1 text-right">
                            <p className="text-sm font-black text-slate-900 sm:text-lg lg:text-xl">{topContributor.percentage}%</p>
                            <p className="text-xs text-slate-500 sm:text-sm">of total</p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default HeroSection;
