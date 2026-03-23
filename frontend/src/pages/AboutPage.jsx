import React from "react";
import { Link } from "react-router-dom";
import { Brain, Cloud, Globe, Lock, Users } from "lucide-react";
import SEO from "../components/SEO";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildWebPageSchema,
} from "../utils/seoSchema";

const AboutPage = () => {
  return (
    <div className="font-sans selection:bg-green-200 selection:text-green-900">
      <SEO
        title="About EcoTrack"
        description="Learn about EcoTrack, our sustainability mission, AI-powered carbon insights, and how our platform helps users reduce emissions with measurable actions."
        path="/about"
        keywords="about EcoTrack, sustainability platform, AI carbon tracker, eco score mission"
        structuredData={[
          buildWebPageSchema({
            title: "About EcoTrack",
            description:
              "Mission and organization details for EcoTrack, an AI sustainability analytics platform.",
            path: "/about",
          }),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
          buildFaqSchema([
            {
              question: "What is EcoTrack?",
              answer:
                "EcoTrack is an AI-powered sustainability dashboard that helps users measure carbon footprint, improve eco score, and follow high-impact reduction plans.",
            },
            {
              question: "Who is EcoTrack built for?",
              answer:
                "EcoTrack is built for students, professionals, and organizations who want practical sustainability analytics and clear weekly carbon reduction actions.",
            },
            {
              question: "How does EcoTrack improve climate action outcomes?",
              answer:
                "EcoTrack combines behavior tracking with AI recommendations, making climate action measurable through trend dashboards and category-level suggestions.",
            },
          ]),
        ]}
      />

      {/* Hero Section */}
      <section className="border-b border-gray-200 bg-white px-4 py-12 sm:px-6 md:py-16">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-100 bg-green-50 px-3 py-1 text-xs font-semibold tracking-wide text-green-700">
            Our Mission
          </div>
          <h1 className="mb-6 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Empowering individuals to build a{" "}
            <span className="text-green-700">
              Sustainable Future.
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
            EcoTrack was built with a simple premise: if everyone understood
            their personal environmental impact, we could collectively change
            the world.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 md:py-16">
        <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Context */}
            <div className="flex flex-col justify-center p-5 sm:p-8 md:p-10 lg:p-14">
              <div className="icon-shell icon-shell-lg icon-tone-green rounded-2xl mb-6 shadow-sm">
                <Globe className="icon-glyph-lg" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                Why EcoTrack?
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Climate change is the defining challenge of our generation.
                While large corporations play a major role, individual actions
                collectively account for nearly{" "}
                <strong className="text-slate-800">
                  70% of global greenhouse gas emissions
                </strong>
                .
              </p>
              <p className="text-slate-600 leading-relaxed">
                We realized that most people want to live sustainably, but they
                don't know where to start or how much impact their daily choices
                actually make. EcoTrack solves this by translating complex
                lifestyle data into readable, actionable insights.
              </p>
            </div>

            {/* Visual/Stats Grid */}
            <div className="grid grid-cols-1 gap-4 border-t border-slate-100 bg-slate-50 p-5 sm:grid-cols-2 sm:gap-6 sm:p-8 md:border-l md:border-t-0 md:p-10 lg:p-14">
              {[
                {
                  label: "CO₂ Tracked",
                  value: "0",
                  sub: "kg so far (Demo)",
                  Icon: Cloud,
                  bg: "bg-green-100",
                  color: "text-green-600",
                },
                {
                  label: "Community",
                  value: "Open",
                  sub: "For everyone",
                  Icon: Users,
                  bg: "bg-emerald-100",
                  color: "text-emerald-600",
                },
                {
                  label: "Intelligence",
                  value: "AI",
                  sub: "Powered analysis",
                  Icon: Brain,
                  bg: "bg-blue-100",
                  color: "text-blue-600",
                },
                {
                  label: "Privacy",
                  value: "100%",
                  sub: "Local & Secure",
                  Icon: Lock,
                  bg: "bg-slate-200",
                  color: "text-slate-700",
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col"
                >
                  <span
                    className={`icon-shell icon-shell-md mb-3 ${stat.bg} ${stat.color}`}
                  >
                    <stat.Icon className="icon-glyph" />
                  </span>
                  <div className="text-2xl font-extrabold text-slate-800 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold text-slate-900">
                    {stat.label}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-4 sm:px-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold text-slate-900">Organization FAQ</h2>
          <div className="mt-5 space-y-4">
            <article className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <h3 className="text-base font-semibold text-slate-900">What makes EcoTrack different from basic calculators?</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                EcoTrack is not just a one-time calculator. It is a continuous sustainability analytics system with AI guidance, trend tracking,
                and an eco score framework for long-term behavior improvement.
              </p>
            </article>
            <article className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <h3 className="text-base font-semibold text-slate-900">Does EcoTrack support organization-wide sustainability awareness?</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Yes. Teams can use shared principles from EcoTrack recommendations to drive consistent low-carbon decisions and build sustainability-first habits.
              </p>
            </article>
            <article className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <h3 className="text-base font-semibold text-slate-900">Where should new users start?</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Start with <Link to="/track" className="font-semibold text-emerald-700 hover:text-emerald-800">Track</Link>, review your
                <Link to="/dashboard" className="ml-1 font-semibold text-emerald-700 hover:text-emerald-800">Dashboard</Link>, then follow
                <Link to="/suggestions" className="ml-1 font-semibold text-emerald-700 hover:text-emerald-800">AI Suggestions</Link> for quick wins.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-4 sm:px-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Explore The EcoTrack SEO Hub</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
            Discover all ranking pages, guides, and product entry points from a single topical authority hub.
          </p>
          <Link
            to="/seo-hub"
            className="mt-4 inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-100"
          >
            Open SEO Hub
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-3xl px-4 py-12 text-center sm:px-6 md:py-16">
        <h2 className="mb-4 text-2xl font-bold text-slate-900 sm:mb-6 sm:text-3xl">
          Ready to make a difference?
        </h2>
        <p className="mb-7 text-sm text-slate-600 sm:mb-10 sm:text-lg">
          Join the platform today, start tracking your daily carbon footprint,
          and take the first step towards a greener, healthier planet.
        </p>
        <Link
          to="/auth"
          className="btn-primary px-6 py-2.5 text-sm sm:px-10 sm:py-4 sm:text-base"
        >
          Start Your Journey
        </Link>
      </section>
    </div>
  );
};

export default AboutPage;
