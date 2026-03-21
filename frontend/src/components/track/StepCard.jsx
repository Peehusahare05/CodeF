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
    const MotionDiv = motion.div;
    const StepIcon = Icon;

    return (
        <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm max-[359px]:p-2.5 sm:p-4 lg:p-6">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.12),transparent_45%)]" />

            <AnimatePresence custom={direction} mode="wait">
                <MotionDiv
                    key={stepKey}
                    custom={direction}
                    variants={cardVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="relative"
                >
                    <div className="mb-4 flex items-start gap-3 max-[359px]:gap-2 sm:mb-5 lg:mb-6">
                        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 max-[359px]:h-8 max-[359px]:w-8">
                            <StepIcon className="h-5 w-5 max-[359px]:h-4 max-[359px]:w-4" />
                        </span>
                        <div>
                            <h2 className="text-lg font-bold text-slate-900 max-[359px]:text-base sm:text-xl lg:text-2xl">{title}</h2>
                            <p className="mt-1 text-xs text-slate-500 max-[359px]:text-[11px] sm:text-sm">{description}</p>
                        </div>
                    </div>

                    {children}
                </MotionDiv>
            </AnimatePresence>
        </div>
    );
};

export default StepCard;
