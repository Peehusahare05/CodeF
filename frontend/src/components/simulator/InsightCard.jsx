import { Brain, ArrowRight } from "lucide-react";

const InsightCard = ({ insight, recommendations }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-indigo-100 p-2 rounded-lg">
          <Brain className="w-6 h-6 text-indigo-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">AI Insights</h2>
      </div>

      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 mb-4">
        <p className="text-gray-700 leading-relaxed">{insight}</p>
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold text-gray-700 text-sm">Next Steps</h3>
        {recommendations.map((rec, index) => (
          <div
            key={index}
            className="flex items-start gap-3 bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-all"
          >
            <ArrowRight className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-700">{rec}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsightCard;
