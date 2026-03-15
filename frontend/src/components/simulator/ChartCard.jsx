import { BarChart } from "lucide-react";

const ChartCard = ({ categories }) => {
  // Find max value for scaling
  const maxValue = Math.max(
    ...categories.map((c) => Math.max(c.current, c.after)),
  );

  return (
    <div className="surface-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="rounded-lg bg-purple-100 p-2">
          <BarChart className="w-6 h-6 text-purple-600" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Category Comparison</h2>
      </div>

      <div className="space-y-4">
        {categories.map((category, index) => {
          const currentWidth = (category.current / maxValue) * 100;
          const afterWidth = (category.after / maxValue) * 100;
          const reduction = (
            ((category.current - category.after) / category.current) *
            100
          ).toFixed(0);

          return (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{category.icon}</span>
                  <span className="font-medium text-slate-700">
                    {category.name}
                  </span>
                </div>
                {reduction > 0 && (
                  <span className="text-sm font-medium text-green-600">
                    -{reduction}%
                  </span>
                )}
              </div>

              <div className="space-y-1.5">
                {/* Current bar */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 w-16">Current</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div className="h-full rounded-full bg-gray-400" style={{ width: `${currentWidth}%` }} />
                  </div>
                  <span className="text-xs font-medium text-gray-600 w-16 text-right">
                    {category.current.toFixed(1)} kg
                  </span>
                </div>

                {/* After bar */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 w-16">After</span>
                  <div className="flex-1 bg-green-50 rounded-full h-3 overflow-hidden">
                    <div className="h-full rounded-full bg-green-500" style={{ width: `${afterWidth}%` }} />
                  </div>
                  <span className="text-xs font-medium text-green-600 w-16 text-right">
                    {category.after.toFixed(1)} kg
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChartCard;
