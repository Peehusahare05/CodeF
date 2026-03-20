import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const cardVariants = {
    enter: (direction) => ({
        x: direction > 0 ? 40 : -40,
        opacity: 0,
        filter: "blur(4px)",
    }),
    center: {
        x: 0,
        opacity: 1,
        filter: "blur(0px)",
    },
    exit: (direction) => ({
        x: direction > 0 ? -40 : 40,
        opacity: 0,
        filter: "blur(4px)",
    }),
};

const StepCard = ({ stepKey, direction, title, description, Icon, children }) => {
    return (
        <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_16px_50px_-28px_rgba(15,23,42,0.45)] sm:p-7">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.12),transparent_45%)]" />

            <AnimatePresence custom={direction} mode="wait">
                <motion.div
                    key={stepKey}
                    custom={direction}
                    variants={cardVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="relative"
                >
                    <div className="mb-6 flex items-start gap-3 sm:mb-7">
                        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                            <Icon className="h-5 w-5" />
                        </span>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">{title}</h2>
                            <p className="mt-1 text-sm text-slate-500">{description}</p>
                        </div>
                    </div>

                    {children}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default StepCard;
