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
        <div className="mt-6 flex flex-col-reverse gap-3 sm:mt-8 sm:flex-row sm:items-center sm:justify-between">
            <button
                type="button"
                onClick={onPrev}
                disabled={isFirstStep || loading}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
                <ArrowLeft className="h-4 w-4" />
                Previous
            </button>

            {isFinalStep ? (
                <button
                    type="submit"
                    onClick={onSubmit}
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    <Calculator className="h-4 w-4" />
                    {loading ? "Calculating..." : "Calculate Carbon Footprint"}
                </button>
            ) : (
                <button
                    type="button"
                    onClick={onNext}
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    Next
                    <ArrowRight className="h-4 w-4" />
                </button>
            )}
        </div>
    );
};

export default NavigationButtons;
