import React from "react";

const CTASection = () => (
  <section className="surface-card border-green-100 bg-green-50 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
    <div>
      <h3 className="mb-2 text-3xl font-bold text-slate-900">
        Start Reducing Your Impact
      </h3>
      <p className="text-slate-600">
        Apply your personalized suggestions and track your progress daily.
      </p>
    </div>
    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
      <button className="btn-primary rounded-2xl px-8 py-3">
        Apply Suggestions
      </button>
      <button className="btn-secondary rounded-2xl px-8 py-3">
        View Dashboard
      </button>
    </div>
  </section>
);

export default CTASection;
