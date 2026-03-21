import React, { Suspense } from "react";
import { motion } from "framer-motion";
import InsightCard from "./InsightCard";

const ChartSection = ({ DonutChart, pieData, pieOptions, breakdown, insightTitle, insightText }) => {
    const MotionArticle = motion.article;
    const DonutWidget = DonutChart;

    return (
        <section className="space-y-3 sm:space-y-4 lg:space-y-6">
            <MotionArticle
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4 lg:p-6"
            >
                <div className="mb-3 flex items-center justify-between gap-3 sm:mb-4">
                    <h3 className="text-base font-bold text-slate-900 sm:text-lg lg:text-xl">Emission Breakdown</h3>
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-500">
                        Category Share
                    </span>
                </div>

                <div className="grid grid-cols-1 items-center gap-3 sm:gap-4 lg:grid-cols-2 lg:gap-6">
                    <div className="w-full">
                        <Suspense fallback={<div className="h-full w-full animate-pulse rounded-2xl bg-slate-100" />}>
                            <div className="mx-auto w-full max-w-[340px]">
                                <DonutWidget data={pieData} options={pieOptions} />
                            </div>
                        </Suspense>
                    </div>

                    <div className="grid w-full grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                        {breakdown.map((item) => (
                            <div
                                key={item.key}
                                className="flex min-h-[72px] items-center justify-between gap-2 rounded-xl border border-slate-100 bg-white p-3 shadow-sm sm:min-h-[84px] sm:p-4 lg:p-6"
                            >
                                <div className="min-w-0 flex items-center gap-2">
                                    <span className="h-2.5 w-2.5 flex-shrink-0 rounded-full sm:h-3 sm:w-3" style={{ backgroundColor: item.color }} />
                                    <p className="truncate text-xs font-semibold text-slate-800 sm:text-sm lg:text-base">{item.key}</p>
                                </div>
                                <p className="flex-shrink-0 text-sm font-bold tabular-nums text-slate-900 sm:text-base lg:text-lg">{item.percentage}%</p>
                            </div>
                        ))}
                    </div>
                </div>
            </MotionArticle>

            <InsightCard title={insightTitle} text={insightText} />
        </section>
    );
};

export default ChartSection;
