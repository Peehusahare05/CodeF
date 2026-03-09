import { Footprints, TrendingDown } from "lucide-react";

const FootprintCard = ({ current, reduction, percentage }) => {
  return (
    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg p-6 text-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg">
            <Footprints className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold">Current Footprint</h2>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-white/80 text-sm mb-1">Total CO₂ Emissions</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold">{current.toFixed(2)}</span>
            <span className="text-xl">kg/month</span>
          </div>
        </div>

        {reduction > 0 && (
          <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-5 h-5" />
              <span className="font-semibold">Potential Reduction</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-green-200">
                -{reduction.toFixed(2)}
              </span>
              <span className="text-lg">kg/month</span>
              <span className="ml-auto text-2xl font-bold">{percentage}%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FootprintCard;
