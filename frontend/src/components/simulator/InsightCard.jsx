import { Brain, ArrowRight } from "lucide-react";

const InsightCard = ({ insight, recommendations }) => {
  return (
    <div className="surface-card p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="rounded-lg bg-indigo-100 p-2">
          <Brain className="w-6 h-6 text-indigo-600" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">AI Insights</h2>
      </div>

      <div className="mb-4 rounded-xl border border-indigo-100 bg-indigo-50 p-4">
        <p className="leading-relaxed text-slate-700">{insight}</p>
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold text-gray-700 text-sm">Next Steps</h3>
        {recommendations.map((rec, index) => (
          <div
            key={index}
            className="flex items-start gap-3 rounded-lg bg-gray-50 p-3 transition-colors hover:bg-gray-100"
          >
            <ArrowRight className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-slate-700">{rec}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsightCard;
