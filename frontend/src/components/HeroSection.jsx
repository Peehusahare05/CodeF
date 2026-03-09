// HeroSection.jsx
import React from "react";

const HeroSection = () => {
  return (
    <section className="w-full bg-gradient-to-br from-green-50 via-green-100 to-white pt-16 pb-20 px-4 md:px-0">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Left */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-4">
            Track Your Personal{" "}
            <span className="text-green-600">Environmental</span> Impact
          </h1>
          <p className="text-lg text-slate-600 mb-8 max-w-lg">
            Understand how your daily lifestyle choices affect the planet with
            our AI-driven sustainability intelligence platform.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
            <button className="rounded-full bg-green-600 hover:bg-green-700 text-white px-7 py-3 font-semibold shadow transition">
              Start Tracking
            </button>
            <button className="rounded-full bg-white border border-green-600 text-green-700 px-7 py-3 font-semibold shadow hover:bg-green-50 transition">
              Learn More
            </button>
          </div>
        </div>
        {/* Right */}
        <div className="flex-1 flex justify-center md:justify-end">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-[340px] md:w-[400px] h-[260px] flex flex-col justify-between relative">
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-tr from-green-200 to-green-400 rounded-full blur-2xl opacity-40"></div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
              </div>
              <div className="h-24 w-full bg-gradient-to-r from-green-100 to-green-200 rounded-lg flex items-end">
                <div className="w-1/5 h-10 bg-green-400 rounded-t-lg mx-1"></div>
                <div className="w-1/5 h-16 bg-green-500 rounded-t-lg mx-1"></div>
                <div className="w-1/5 h-20 bg-green-600 rounded-t-lg mx-1"></div>
                <div className="w-1/5 h-14 bg-green-300 rounded-t-lg mx-1"></div>
                <div className="w-1/5 h-12 bg-green-200 rounded-t-lg mx-1"></div>
              </div>
              <div className="flex justify-between mt-4">
                <div>
                  <div className="text-xs text-slate-500">CO₂ Saved</div>
                  <div className="font-bold text-green-600 text-lg">+18%</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Eco Score</div>
                  <div className="font-bold text-blue-500 text-lg">72</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Trend</div>
                  <div className="font-bold text-yellow-500 text-lg">↑</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
