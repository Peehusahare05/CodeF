import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { buildBreadcrumbSchema, buildFaqSchema, buildWebPageSchema } from "../utils/seoSchema";
import HeroSection from "../components/HeroSection";
import ProblemSection from "../components/ProblemSection";
import HowItWorksSection from "../components/HowItWorksSection";
import FeaturesSection from "../components/FeaturesSection";
import DashboardPreviewSection from "../components/DashboardPreviewSection";
import CommunityLeaderboardSection from "../components/CommunityLeaderboardSection";
import FinalCTASection from "../components/FinalCTASection";

const LandingPage = () => (
  <div className="font-sans">
    <SEO
      title="EcoTrack - AI Sustainability Dashboard"
      description="EcoTrack helps you monitor your carbon footprint, improve eco score, and get practical AI recommendations for sustainable daily choices."
      path="/"
      keywords="AI Carbon Footprint Tracker, Sustainability Dashboard India, Eco Score Calculator, EcoTrack"
      structuredData={[
        buildWebPageSchema({
          title: "EcoTrack - AI Sustainability Dashboard",
          description:
            "Monitor emissions, improve eco score, and act on AI sustainability recommendations.",
          path: "/",
        }),
        buildBreadcrumbSchema([
          { name: "Home", path: "/" },
        ]),
        buildFaqSchema([
          {
            question: "What is EcoTrack and how does it work?",
            answer:
              "EcoTrack is an AI carbon footprint tracker that analyzes lifestyle inputs like transport, electricity, waste, and plastic, then provides reduction insights and an eco score.",
          },
          {
            question: "Can I use EcoTrack as a sustainability dashboard in India?",
            answer:
              "Yes. EcoTrack is designed as a sustainability dashboard India users can access to track emissions and follow practical carbon reduction tips.",
          },
        ]),
      ]}
    />
    <HeroSection />
    <ProblemSection />
    <HowItWorksSection />
    <FeaturesSection />
    <DashboardPreviewSection />
    <CommunityLeaderboardSection />

    <section className="mx-auto mt-8 max-w-7xl px-4 pb-2 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">AI Carbon Footprint Tracker for Data-Driven Sustainability</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
          EcoTrack combines an eco score calculator with sustainability analytics so you can measure your weekly CO2 impact, discover top emission categories,
          and follow personalized action plans.
        </p>
        <h3 className="mt-5 text-base font-semibold text-slate-900 sm:text-lg">Explore key sections</h3>
        <div className="mt-3 flex flex-wrap gap-2 text-sm font-medium">
          <Link to="/dashboard" className="rounded-full border border-slate-200 px-3 py-1.5 text-slate-700 hover:border-emerald-200 hover:text-emerald-700">Carbon Footprint Dashboard</Link>
          <Link to="/track" className="rounded-full border border-slate-200 px-3 py-1.5 text-slate-700 hover:border-emerald-200 hover:text-emerald-700">Daily Emission Calculator</Link>
          <Link to="/ai-advisor" className="rounded-full border border-slate-200 px-3 py-1.5 text-slate-700 hover:border-emerald-200 hover:text-emerald-700">AI Sustainability Advisor</Link>
          <Link to="/suggestions" className="rounded-full border border-slate-200 px-3 py-1.5 text-slate-700 hover:border-emerald-200 hover:text-emerald-700">Carbon Reduction Tips</Link>
        </div>
      </div>
    </section>

    <section className="sr-only" aria-label="SEO content">
      <h2>Sustainability Dashboard India</h2>
      <p>
        EcoTrack is an AI carbon footprint tracker and eco score calculator built for users looking for practical sustainability analytics,
        daily emission tracking, and measurable carbon reduction strategies.
      </p>
    </section>

    <FinalCTASection />
  </div>
);

export default LandingPage;

