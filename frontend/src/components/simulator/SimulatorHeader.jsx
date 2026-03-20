import { RefreshCw, SlidersHorizontal } from "lucide-react";

const SimulatorHeader = ({ onReset }) => {
    return (
        <section className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                    Analytics Tool
                </p>
                <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    Carbon Reduction Simulator
                </h1>
                <p className="mt-2 max-w-2xl text-sm text-slate-600">
                    Test reduction strategies and instantly compare your current footprint against projected results.
                </p>
            </div>

            <button
                type="button"
                onClick={onReset}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
                <RefreshCw className="h-4 w-4" />
                Reset Controls
            </button>
        </section>
    );
};

export default SimulatorHeader;
