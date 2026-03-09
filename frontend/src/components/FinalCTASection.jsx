// FinalCTASection.jsx
import React from "react";

const FinalCTASection = () => (
  <section className="py-20 px-4">
    <div className="max-w-4xl mx-auto bg-gradient-to-tr from-green-500 to-green-400 rounded-3xl shadow-lg p-12 flex flex-col items-center text-center">
      <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
        Start Your Sustainability Journey Today
      </h2>
      <p className="text-lg text-green-50 mb-8">
        Join over 50,000+ individuals reducing their footprint and building a
        greener future with EcoTrack.
      </p>
      <button className="rounded-full bg-white text-green-700 font-bold px-8 py-3 shadow hover:bg-green-50 transition text-lg">
        Start Tracking Now
      </button>
    </div>
  </section>
);

export default FinalCTASection;
