import { CheckCircle, BarChart } from "lucide-react";

const CTASection = ({ onApply, onViewDashboard }) => {
  return (
    <div className="surface-card border-green-100 bg-green-50 p-8">
      <div className="text-center mb-6">
        <h2 className="mb-2 text-2xl font-bold text-slate-900">
          Ready to Make These Changes?
        </h2>
        <p className="text-slate-600">
          Apply your simulation to track progress or view your current dashboard
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onApply}
          className="btn-primary rounded-xl px-8 py-3"
        >
          <CheckCircle className="w-5 h-5" />
          Apply Changes
        </button>

        <button
          onClick={onViewDashboard}
          className="btn-secondary rounded-xl px-8 py-3"
        >
          <BarChart className="w-5 h-5" />
          View Dashboard
        </button>
      </div>
    </div>
  );
};

export default CTASection;
