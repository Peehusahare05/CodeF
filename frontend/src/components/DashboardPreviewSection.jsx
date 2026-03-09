// DashboardPreviewSection.jsx
import React from "react";

const DashboardPreviewSection = () => (
  <section className="py-20 px-4 bg-green-50" id="dashboard">
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
          Smart Environmental Insights
        </h2>
        <a
          href="#"
          className="text-green-600 font-semibold hover:underline mt-2 md:mt-0"
        >
          View Detailed Dashboard →
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Daily Footprint Card */}
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center">
          <div className="text-xs text-slate-500 mb-1">DAILY FOOTPRINT</div>
          <div className="text-4xl font-extrabold text-green-600 mb-1">
            42{" "}
            <span className="text-lg font-normal text-slate-500">kg CO₂</span>
          </div>
          <div className="text-xs text-green-500">+12% from last week</div>
        </div>
        {/* Eco Score Gauge */}
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center">
          <div className="text-xs text-slate-500 mb-1">ECO SCORE GUIDE</div>
          <div className="relative w-24 h-24 flex items-center justify-center mb-2">
            <svg
              className="absolute top-0 left-0"
              width="96"
              height="96"
              viewBox="0 0 96 96"
            >
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="#e5e7eb"
                strokeWidth="10"
                fill="none"
              />
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="#16a34a"
                strokeWidth="10"
                fill="none"
                strokeDasharray="251.2"
                strokeDashoffset="70"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-3xl font-bold text-green-600">72</span>
          </div>
          <div className="text-xs text-slate-500">/ 100</div>
        </div>
        {/* Bar Chart Card */}
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center">
          <div className="text-xs text-slate-500 mb-2">
            Carbon Sources Breakdown
          </div>
          <div className="flex items-end gap-1 w-full h-24">
            <div className="w-4 h-8 bg-green-200 rounded-t"></div>
            <div className="w-4 h-12 bg-green-300 rounded-t"></div>
            <div className="w-4 h-16 bg-green-400 rounded-t"></div>
            <div className="w-4 h-10 bg-green-500 rounded-t"></div>
            <div className="w-4 h-20 bg-green-600 rounded-t"></div>
            <div className="w-4 h-14 bg-green-400 rounded-t"></div>
            <div className="w-4 h-18 bg-green-300 rounded-t"></div>
          </div>
          <div className="flex justify-between w-full mt-2 text-xs text-slate-400">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default DashboardPreviewSection;
