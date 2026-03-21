import React from "react";
import { ArrowLeft, ArrowRight, Calculator } from "lucide-react";

const NavigationButtons = ({
    currentStep,
    totalSteps,
    onNext,
    onPrev,
    onSubmit,
    loading,
}) => {
    const isFirstStep = currentStep === 0;
    const isFinalStep = currentStep === totalSteps - 1;

    return (
        <div className="mt-6 flex flex-col gap-3 max-[359px]:mt-5 max-[359px]:gap-2.5 sm:mt-8 sm:flex-row sm:items-center sm:justify-between">
            <button
                type="button"
                onClick={onPrev}
                disabled={isFirstStep || loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50 max-[359px]:px-3 max-[359px]:py-2.5 max-[359px]:text-xs disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
                <ArrowLeft className="h-4 w-4" />
                Previous
            </button>

            {isFinalStep ? (
                <button
                    type="submit"
                    onClick={onSubmit}
                    disabled={loading}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-emerald-700 max-[359px]:px-3 max-[359px]:py-2.5 max-[359px]:text-xs disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                    <Calculator className="h-4 w-4" />
                    {loading ? "Calculating..." : "Calculate Carbon Footprint"}
                </button>
            ) : (
                <button
                    type="button"
                    onClick={onNext}
                    disabled={loading}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-slate-800 max-[359px]:px-3 max-[359px]:py-2.5 max-[359px]:text-xs disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                    Next
                    <ArrowRight className="h-4 w-4" />
                </button>
            )}
        </div>
    );
};

export default NavigationButtons;
