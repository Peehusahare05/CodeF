import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { buildBreadcrumbSchema, buildFaqSchema, buildWebPageSchema } from "../utils/seoSchema";
import InputForm from "../components/InputForm";

const TrackPage = () => (
  <div className="min-w-0 space-y-3 font-sans sm:space-y-4 lg:space-y-6">
    <SEO
      title="Track Emissions - Carbon Footprint Input"
      description="Log electricity, transport, waste, and plastic usage to calculate your weekly CO2 footprint and improve your EcoTrack score."
      path="/track"
      keywords="carbon footprint tracker, daily emission calculator, eco score calculator, weekly CO2 tracker"
      structuredData={[
        buildWebPageSchema({
          title: "Track Emissions - Carbon Footprint Input",
          description:
            "Input your weekly lifestyle data to compute total CO2 and track sustainability progress.",
          path: "/track",
        }),
        buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Track", path: "/track" },
        ]),
        buildFaqSchema([
          {
            question: "How does the carbon footprint tracker work?",
            answer:
              "The tracker converts your transport, electricity, waste, and plastic usage into total weekly CO2 and a sustainability score.",
          },
          {
            question: "Can this work as a daily emission calculator?",
            answer:
              "Yes. You can update your activity regularly and use the results as a daily emission calculator to monitor progress over time.",
          },
        ]),
      ]}
    />
    <InputForm />

    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 lg:p-6">
      <h2 className="text-lg font-bold text-slate-900 sm:text-xl">Carbon Footprint Tracker and Daily Emission Calculator</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
        Add consistent inputs to improve result accuracy and unlock clearer reduction priorities for your weekly carbon profile.
      </p>
      <h3 className="mt-4 text-sm font-semibold uppercase tracking-[0.1em] text-slate-500">Continue Your Flow</h3>
      <div className="mt-3 flex flex-wrap gap-2 text-sm font-medium">
        <Link to="/dashboard" className="rounded-full border border-slate-200 px-3 py-1.5 text-slate-700 hover:border-emerald-200 hover:text-emerald-700">Go to Dashboard</Link>
        <Link to="/suggestions" className="rounded-full border border-slate-200 px-3 py-1.5 text-slate-700 hover:border-emerald-200 hover:text-emerald-700">Get Suggestions</Link>
        <Link to="/ai-advisor" className="rounded-full border border-slate-200 px-3 py-1.5 text-slate-700 hover:border-emerald-200 hover:text-emerald-700">Ask AI Advisor</Link>
      </div>
    </section>

    <section className="sr-only" aria-label="Track SEO content">
      <h2>daily emission calculator</h2>
      <p>
        Use EcoTrack as a carbon footprint tracker and daily emission calculator to monitor CO2 output and improve your eco score every week.
      </p>
    </section>
  </div>
);

export default TrackPage;
