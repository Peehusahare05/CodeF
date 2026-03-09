import React from "react";

const CTASection = () => (
  <section className="rounded-2xl bg-gradient-to-r from-green-600 to-green-400 p-8 md:p-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
    <div>
      <h3 className="text-4xl font-extrabold text-white mb-2">
        Start Reducing Your Impact
      </h3>
      <p className="text-green-50">
        Apply your personalized suggestions and track your progress daily.
      </p>
    </div>
    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
      <button className="rounded-2xl bg-white text-green-700 font-bold px-8 py-3 shadow-md">
        Apply Suggestions
      </button>
      <button className="rounded-2xl border border-green-200/50 bg-green-500/20 text-white font-bold px-8 py-3">
        View Dashboard
      </button>
    </div>
  </section>
);

export default CTASection;
