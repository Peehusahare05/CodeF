import { Sparkles, DollarSign, Calendar } from "lucide-react";

const ResultsCard = ({ savings }) => {
  return (
    <div className="surface-card bg-slate-50 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="rounded-lg bg-white p-2">
          <Sparkles className="w-6 h-6 text-purple-600" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Impact Results</h2>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {/* Monthly Savings */}
        <div className="rounded-xl border border-slate-100 bg-white p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-green-100 p-2 rounded-lg">
              <Calendar className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600">Monthly Impact</p>
              <p className="text-2xl font-bold text-gray-800">
                {savings.monthly.toFixed(1)} kg CO₂
              </p>
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-3 mt-2">
            <p className="text-xs text-green-700">
              Equivalent to{" "}
              <span className="font-bold">
                {Math.round(savings.monthly / 21)} miles
              </span>{" "}
              not driven
            </p>
          </div>
        </div>

        {/* Yearly Savings */}
        <div className="rounded-xl border border-slate-100 bg-white p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600">Yearly Impact</p>
              <p className="text-2xl font-bold text-gray-800">
                {savings.yearly.toFixed(0)} kg CO₂
              </p>
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-3 mt-2">
            <p className="text-xs text-blue-700">
              Saves{" "}
              <span className="font-bold">
                {Math.round(savings.yearly / 411)} trees
              </span>{" "}
              worth of carbon absorption
            </p>
          </div>
        </div>

        {/* Cost Savings */}
        <div className="rounded-xl border border-slate-100 bg-white p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-yellow-100 p-2 rounded-lg">
              <DollarSign className="w-5 h-5 text-yellow-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600">Estimated Cost Savings</p>
              <p className="text-2xl font-bold text-gray-800">
                ${savings.cost.toFixed(0)}/year
              </p>
            </div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-3 mt-2">
            <p className="text-xs text-yellow-700">
              From reduced fuel, electricity, and waste disposal costs
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsCard;
