import React from "react";
import { Sparkles } from "lucide-react";

const InsightCard = ({ title, text }) => {
    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4 lg:p-6">
            <div className="mb-3 flex items-start gap-3">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white sm:h-10 sm:w-10">
                    <Sparkles className="h-5 w-5" />
                </span>
                <p className="pt-1 text-xs font-semibold uppercase tracking-[0.15em] text-emerald-700 sm:text-sm">
                    {title}
                </p>
            </div>
            <p className="text-sm leading-relaxed text-slate-700 sm:text-base lg:text-lg">{text}</p>
        </section>
    );
};

export default InsightCard;
