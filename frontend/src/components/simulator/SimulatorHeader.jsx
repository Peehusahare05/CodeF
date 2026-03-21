import { RefreshCw } from "lucide-react";

const SimulatorHeader = ({ onReset }) => {
    return (
        <section className="mb-3 space-y-3 sm:mb-4 sm:space-y-4 lg:mb-6 lg:space-y-6">
            <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                        Analytics Tool
                    </p>
                    <h1 className="mt-1 text-lg font-bold tracking-tight text-slate-900 sm:text-xl lg:text-2xl">
                        Carbon Reduction Simulator
                    </h1>
                    <p className="mt-2 text-xs text-slate-600 sm:text-sm">
                        Test reduction strategies and compare projected results.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onReset}
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 sm:rounded-xl sm:px-4 sm:py-2 sm:text-sm"
                >
                    <RefreshCw className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Reset</span>
                </button>
            </div>
        </section>
    );
};

export default SimulatorHeader;
