// HeroSection.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import CarbonMap from "./CarbonMap";

const HeroSection = () => {
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <>
      <section className="w-full bg-gradient-to-br from-green-50 via-green-100 to-white pt-16 pb-20 px-4 md:px-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">

          {/* Left — text content */}
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
              <Link
                to="/track"
                className="rounded-full bg-green-600 hover:bg-green-700 text-white px-7 py-3 font-semibold shadow transition text-center"
              >
                Start Tracking
              </Link>
              <a
                href="#how"
                className="rounded-full bg-white border border-green-600 text-green-700 px-7 py-3 font-semibold shadow hover:bg-green-50 transition text-center"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Right — Interactive Carbon Hotspot Map (click to expand) */}
          <div className="flex-1 flex justify-center md:justify-end w-full">
            <div
              className="bg-white rounded-2xl shadow-lg w-full max-w-[440px] h-[320px] relative cursor-pointer group border-2 border-green-400 p-2"
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
