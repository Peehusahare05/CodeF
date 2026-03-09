// HeroSection.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import CarbonMap from "./CarbonMap";

const HeroSection = () => {
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <>
      <section className="relative w-full bg-slate-50 overflow-hidden pt-20 pb-28 px-6 md:px-12">
        {/* Background Decorative Blur Blobs */}
        <div className="absolute top-0 -left-40 w-[500px] h-[500px] bg-green-200/40 rounded-full blur-[100px] opacity-70 pointer-events-none"></div>
        <div className="absolute top-20 -right-40 w-[600px] h-[600px] bg-emerald-200/30 rounded-full blur-[120px] opacity-60 pointer-events-none"></div>
        <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-100/40 rounded-full blur-[120px] opacity-50 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">

          {/* Left — text content */}
          <div className="flex-1 text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-green-100 text-green-700 text-sm font-bold tracking-wide mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              AI-Powered Sustainability
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.15] tracking-tight mb-6">
              Track Your Personal <br className="hidden lg:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400">
                Environmental Impact
              </span>
            </h1>
            
            <p className="text-lg lg:text-xl text-slate-600 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Understand how your daily lifestyle choices affect the planet with
              our intelligent sustainability tracking platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/track"
                className="rounded-full bg-green-600 hover:bg-green-700 text-white px-8 py-3.5 text-lg font-bold shadow-lg shadow-green-600/30 hover:shadow-green-600/50 hover:-translate-y-0.5 transition-all text-center"
              >
                Start Tracking Free
              </Link>
              <a
                href="#how"
                className="rounded-full bg-white border-2 border-slate-200 text-slate-700 hover:border-green-600 hover:text-green-700 px-8 py-3.5 text-lg font-bold shadow-sm hover:bg-green-50 hover:-translate-y-0.5 transition-all text-center"
              >
                See How It Works
              </a>
            </div>
          </div>

          {/* Right — Interactive Carbon Hotspot Map (click to expand) */}
          <div className="flex-1 flex justify-center lg:justify-end w-full relative z-10 w-full lg:max-w-none max-w-[500px]">
            {/* Map Decoration Halo */}
            <div className="absolute inset-0 bg-gradient-to-tr from-green-400 to-emerald-300 rounded-[2rem] blur-2xl opacity-20 transform -rotate-3 scale-105"></div>
            
            <div
              className="bg-white rounded-2xl shadow-2xl w-full h-[360px] relative cursor-pointer group border border-white/60 p-2 backdrop-blur-sm"
              onClick={() => setFullscreen(true)}
              title="Click to expand map"
            >
              {/* Overlay label */}
              <div className="absolute top-2 left-3 z-[1000] bg-white/80 backdrop-blur-sm text-xs text-gray-600 font-semibold px-2 py-1 rounded-md shadow-sm pointer-events-none">
                🌍 Live Carbon Emission Zones — Nagpur
              </div>

              {/* Expand hint */}
              <div className="absolute top-2 right-3 z-[1000] bg-green-600 text-white text-xs px-2 py-1 rounded-md shadow opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                ⛶ Click to expand
              </div>

              {/* Map (pointer-events off so clicks bubble to card) */}
              <div className="w-full h-full pointer-events-none rounded-xl overflow-hidden">
                <CarbonMap />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Fullscreen Modal ──────────────────────────────────────────── */}
      {fullscreen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/70 flex items-center justify-center p-4"
          onClick={() => setFullscreen(false)}
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl"
            style={{ height: "85vh" }}
            onClick={(e) => e.stopPropagation()} // prevent close on map click
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100">
              <span className="font-bold text-slate-800 text-base">
                🌍 Carbon Emission Hotspot Map — Nagpur
              </span>
              <button
                onClick={() => setFullscreen(false)}
                className="text-slate-400 hover:text-red-500 transition text-2xl font-bold leading-none"
                title="Close"
              >
                ✕
              </button>
            </div>

            {/* Fullscreen map */}
            <div style={{ height: "calc(85vh - 56px)", width: "100%", borderRadius: "0 0 16px 16px", overflow: "hidden" }}>
              <CarbonMap />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeroSection;
