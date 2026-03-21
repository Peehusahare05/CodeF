import React from "react";
import { motion } from "framer-motion";

const CategoryCard = ({ Icon, title, value, percentage, description, tone, barTone }) => {
    const MotionArticle = motion.article;
    const IconComponent = Icon;

    return (
        <MotionArticle
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm transition-all hover:-translate-y-0.5 hover:border-slate-300 sm:p-4 lg:p-5"
        >
            <div className="mb-2 flex items-start justify-between gap-2 sm:mb-3 sm:gap-3">
                <span className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl sm:h-10 sm:w-10 ${tone}`}>
                    <IconComponent className="h-4 w-4 sm:h-5 sm:w-5" />
                </span>
                <div className="min-w-0 text-right">
                    <p className="truncate whitespace-nowrap text-sm font-bold tabular-nums text-slate-900 sm:text-base lg:text-lg">{value} kg</p>
                    <p className="text-[11px] font-semibold text-slate-500 sm:text-xs">{percentage}% share</p>
                </div>
            </div>

            <h4 className="truncate text-xs font-semibold text-slate-800 sm:text-sm lg:text-base">{title}</h4>
            <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-slate-500 sm:text-xs lg:text-sm">{description}</p>

            <div className="mt-3 h-2 rounded-full bg-slate-200 sm:mt-4">
                <div
                    className={`h-2 rounded-full transition-all duration-500 ${barTone}`}
                    style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
                />
            </div>
        </MotionArticle>
    );
};

export default CategoryCard;
