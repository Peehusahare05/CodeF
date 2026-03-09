import { CheckCircle, BarChart } from "lucide-react";

const CTASection = ({ onApply, onViewDashboard }) => {
  return (
    <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl shadow-lg p-8 text-white">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">
          Ready to Make These Changes?
        </h2>
        <p className="text-white/90">
          Apply your simulation to track progress or view your current dashboard
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onApply}
          className="flex items-center justify-center gap-2 px-8 py-3 bg-white text-green-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-md"
        >
          <CheckCircle className="w-5 h-5" />
          Apply Changes
        </button>

        <button
          onClick={onViewDashboard}
          className="flex items-center justify-center gap-2 px-8 py-3 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 border-2 border-white/30"
        >
          <BarChart className="w-5 h-5" />
          View Dashboard
        </button>
      </div>
    </div>
  );
};

export default CTASection;
