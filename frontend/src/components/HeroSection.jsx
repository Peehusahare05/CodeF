// HeroSection.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Expand, Globe, X } from "lucide-react";
import CarbonMap from "./CarbonMap";

const HeroSection = () => {
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <>
      <section className="bg-gray-50 py-12 md:py-20" id="home">
        <div className="section-wrap grid grid-cols-1 items-center gap-8 md:gap-10 lg:grid-cols-2">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-green-100 bg-green-50 px-3 py-1 text-xs font-semibold tracking-wide text-green-700">
              <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
              Personal Sustainability Platform
            </div>

            <h1 className="mb-5 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl md:text-5xl">
              Track Your Personal
              <br className="hidden md:block" />
              <span className="text-green-700">
                Environmental Impact
              </span>
            </h1>

            <p className="mb-6 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base md:mb-8 md:text-lg">
              Understand how your daily lifestyle choices affect the planet with
              our intelligent sustainability tracking platform.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to="/track" className="btn-primary text-center">
                Start Tracking Free
              </Link>
              <a href="#how" className="btn-secondary text-center">
                See How It Works
              </a>
            </div>
          </div>

          <div>
            <div
              className="surface-card relative h-[280px] cursor-pointer overflow-hidden p-2 sm:h-[340px]"
              onClick={() => setFullscreen(true)}
              title="Click to expand map"
            >
              <div className="pointer-events-none absolute left-3 top-3 z-[1000] inline-flex items-center gap-1.5 rounded-md border border-gray-200 bg-white/95 px-2 py-1 text-[11px] font-medium text-gray-600 sm:text-xs">
                <Globe className="icon-glyph-sm text-emerald-600" />
                Live Carbon Emission Zones - Nagpur
              </div>

              <div className="pointer-events-none absolute right-3 top-3 z-[1000] hidden items-center gap-1 rounded-md bg-green-600 px-2 py-1 text-xs text-white sm:inline-flex">
                <Expand className="icon-glyph-sm" />
                Click to expand
              </div>

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
            className="relative w-full max-w-5xl rounded-2xl bg-white shadow-xl"
            style={{ height: "85vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
              <span className="font-bold text-slate-800 text-base inline-flex items-center gap-2">
                <Globe className="icon-glyph-sm text-emerald-600" />
                Carbon Emission Hotspot Map - Nagpur
              </span>
              <button
                onClick={() => setFullscreen(false)}
                className="leading-none text-slate-400 transition-colors hover:text-slate-600"
                title="Close"
              >
                <X className="icon-glyph" />
              </button>
            </div>

            <div
              style={{
                height: "calc(85vh - 56px)",
                width: "100%",
                borderRadius: "0 0 16px 16px",
                overflow: "hidden",
              }}
            >
              <CarbonMap />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeroSection;
