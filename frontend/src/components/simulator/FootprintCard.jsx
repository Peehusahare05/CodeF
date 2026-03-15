import { Footprints, TrendingDown } from "lucide-react";

const FootprintCard = ({ current, reduction, percentage }) => {
  return (
    <div className="surface-card border-green-100 bg-green-50 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-white p-2 text-green-700">
            <Footprints className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Current Footprint</h2>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <p className="mb-1 text-sm text-slate-500">Total CO₂ Emissions</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-slate-900">{current.toFixed(2)}</span>
            <span className="text-xl text-slate-600">kg/month</span>
          </div>
        </div>

        {reduction > 0 && (
          <div className="rounded-xl border border-green-200 bg-white p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-5 h-5 text-green-700" />
              <span className="font-semibold text-slate-800">Potential Reduction</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-green-700">
                -{reduction.toFixed(2)}
              </span>
              <span className="text-lg text-slate-600">kg/month</span>
              <span className="ml-auto text-2xl font-bold text-green-700">{percentage}%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FootprintCard;
