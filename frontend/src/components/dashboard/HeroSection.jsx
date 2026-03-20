import React from "react";
import { motion } from "framer-motion";
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
    const isTrendPositive = trendLabel?.includes("lower");

    return (
        <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50/50 to-slate-100/30 shadow-[0_24px_50px_-34px_rgba(15,23,42,0.75)]"
        >
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-slate-900/3 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-emerald-500/5 blur-3xl" />

            <div className="relative p-6 sm:p-8">
                <div className="mb-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Carbon Storyline
                    </p>
                    <h1 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl lg:text-5xl">
                        Your Carbon Footprint is {impact.label.replace(" Impact", "")}
                    </h1>
                    <p className="mt-4 max-w-3xl text-sm text-slate-600 sm:text-base leading-relaxed">
                        Electricity, transport, waste, and plastic patterns are combined into one weekly impact signal so you can act on what matters most.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-6">
                    {/* Total CO2 */}
                    <div className="rounded-2xl border border-slate-200 bg-white/70 backdrop-blur p-4 hover:shadow-md transition-shadow">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Total CO2</p>
                        <p className="mt-2 text-3xl sm:text-4xl font-black text-slate-900">{total}</p>
                        <p className="text-xs font-medium text-slate-500 mt-0.5">kg/week</p>
                    </div>

                    {/* Eco Score */}
                    <div className="rounded-2xl border border-blue-200 bg-blue-50/50 backdrop-blur p-4 hover:shadow-md transition-shadow">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-600">Eco Score</p>
                        <p className="mt-2 text-3xl sm:text-4xl font-black text-blue-700">{ecoScore}</p>
                        <p className="text-xs font-medium text-blue-600 mt-0.5">/ 100</p>
                    </div>

                    {/* Impact Level */}
                    <div className={`rounded-2xl border ${tone.border} ${tone.badgeBg} backdrop-blur p-4 hover:shadow-md transition-shadow`}>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Impact</p>
                        <p className={`mt-2 text-sm sm:text-base font-black ${tone.text}`}>{impact.label}</p>
                        <div className="mt-2 h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                            <div
                                className={`h-full ${tone.text.replace('text-', 'bg-')} rounded-full`}
                                style={{ width: impact.label === 'Low Impact' ? '33%' : impact.label === 'Moderate Impact' ? '66%' : '100%' }}
                            />
                        </div>
                    </div>

                    {/* Trend */}
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 backdrop-blur p-4 hover:shadow-md transition-shadow">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-600">Trend</p>
                        <div className="mt-2 flex items-center gap-1.5">
                            <TrendingDown className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                            <p className="text-xs sm:text-sm font-semibold text-emerald-700">{trendLabel}</p>
                        </div>
                    </div>
                </div>

                {/* Biggest Contributor */}
                {topContributor && (
                    <div className="rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-50 to-white p-4 flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Biggest Contributor</p>
                            <p className="mt-2 text-lg sm:text-xl font-bold text-slate-900">{topContributor.label}</p>
                        </div>
                        <div className="text-right">
                            <Zap className="h-8 w-8 text-amber-500 mb-2" />
                            <p className="text-2xl sm:text-3xl font-black text-slate-900">{topContributor.percentage}%</p>
                            <p className="text-xs text-slate-500 mt-0.5">of total</p>
                        </div>
                    </div>
                )}
            </div>
        </motion.section>
    );
};

export default HeroSection;
