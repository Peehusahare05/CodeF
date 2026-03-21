import React from "react";
import { motion } from "framer-motion";

const ChartCard = ({ title, badge, children }) => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4 lg:p-6"
        >
            <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="text-base font-bold text-slate-900 sm:text-lg lg:text-xl">{title}</h3>
                {badge ? (
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-500">
                        {badge}
                    </span>
                ) : null}
            </div>
            {children}
        </motion.section>
    );
};

export default ChartCard;
