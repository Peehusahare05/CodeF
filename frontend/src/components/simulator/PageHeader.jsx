import { Calculator, RefreshCw } from "lucide-react";

const PageHeader = ({ onReset }) => {
  return (
    <div className="surface-card mb-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-blue-100 p-3">
            <Calculator className="h-7 w-7 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Carbon Reduction Simulator
            </h1>
            <p className="mt-1 text-slate-600">
              Simulate lifestyle changes and see their impact on your carbon
              footprint
            </p>
          </div>
        </div>
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-slate-700 transition-colors hover:bg-slate-200"
        >
          <RefreshCw className="w-4 h-4" />
          Reset
        </button>
      </div>
    </div>
  );
};

export default PageHeader;
