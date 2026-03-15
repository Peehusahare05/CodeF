import { TrendingDown, Award, Trees } from "lucide-react";

const ReductionCard = ({ after, saved, trees, grade }) => {
  const getGradeColor = (grade) => {
    const colors = {
      "A+": "text-green-600 bg-green-100",
      A: "text-green-600 bg-green-100",
      B: "text-blue-600 bg-blue-100",
      C: "text-yellow-600 bg-yellow-100",
      D: "text-orange-600 bg-orange-100",
      F: "text-red-600 bg-red-100",
    };
    return colors[grade] || "text-gray-600 bg-gray-100";
  };

  return (
    <div className="surface-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="rounded-lg bg-blue-100 p-2">
          <TrendingDown className="w-6 h-6 text-blue-600" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">After Changes</h2>
      </div>

      <div className="space-y-6">
        <div>
          <p className="text-slate-600 text-sm mb-2">Projected Emissions</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-slate-900">
              {after.toFixed(2)}
            </span>
            <span className="text-xl text-slate-600">kg/month</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-green-50 rounded-xl p-4">
            <p className="text-green-600 text-sm font-medium mb-1">CO₂ Saved</p>
            <p className="text-2xl font-bold text-green-700">
              {saved.toFixed(1)} kg
            </p>
          </div>

          <div className="bg-blue-50 rounded-xl p-4">
            <p className="text-blue-600 text-sm font-medium mb-1">
              Trees Equivalent
            </p>
            <p className="text-2xl font-bold text-blue-700 inline-flex items-center gap-2">
              <Trees className="w-5 h-5" />
              {trees}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-slate-600" />
            <span className="font-medium text-slate-700">New Eco Grade</span>
          </div>
          <span
            className={`px-4 py-2 rounded-lg font-bold text-xl ${getGradeColor(grade)}`}
          >
            {grade}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReductionCard;
