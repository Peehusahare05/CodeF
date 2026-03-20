import React from "react";
import { Check } from "lucide-react";

const Stepper = ({ steps, currentStep }) => {
    return (
        <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-4 shadow-sm backdrop-blur sm:p-6">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
                {steps.map((step, index) => {
                    const isCompleted = index < currentStep;
                    const isActive = index === currentStep;

                    return (
                        <div
                            key={step.key}
                            className={`relative overflow-hidden rounded-2xl border px-3 py-3 transition-all sm:px-4 sm:py-4 ${isActive
                                    ? "border-emerald-400 bg-emerald-50 shadow-[0_8px_24px_-12px_rgba(16,185,129,0.6)]"
                                    : isCompleted
                                        ? "border-emerald-200 bg-emerald-50/70"
                                        : "border-slate-200 bg-slate-50"
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <span
                                    className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${isCompleted
                                            ? "bg-emerald-600 text-white"
                                            : isActive
                                                ? "bg-emerald-100 text-emerald-700"
                                                : "bg-slate-200 text-slate-500"
                                        }`}
                                >
                                    {isCompleted ? <Check className="h-4 w-4" /> : index + 1}
                                </span>
                                <div className="min-w-0">
                                    <p className="truncate text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                                        Step {index + 1}
                                    </p>
                                    <p className="truncate text-sm font-semibold text-slate-800">
                                        {step.label}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Stepper;
