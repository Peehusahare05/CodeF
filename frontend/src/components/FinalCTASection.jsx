// FinalCTASection.jsx
import React from "react";

const FinalCTASection = () => (
  <section className="py-12 md:py-16">
    <div className="section-wrap max-w-4xl">
      <div className="surface-card border-green-100 bg-green-50 p-5 sm:p-7 md:p-10 text-center">
        <h2 className="mb-3 text-2xl font-bold text-slate-900 md:text-4xl">
          Start Your Sustainability Journey Today
        </h2>
        <p className="mx-auto mb-6 md:mb-8 max-w-2xl text-sm sm:text-base text-slate-600 md:text-lg">
          Join over 50,000+ individuals reducing their footprint and building a
          greener future with EcoTrack.
        </p>
        <button className="btn-primary px-6 py-2.5 text-sm sm:px-8 sm:py-3 sm:text-base">
          Start Tracking Now
        </button>
      </div>
    </div>
  </section>
);

export default FinalCTASection;
