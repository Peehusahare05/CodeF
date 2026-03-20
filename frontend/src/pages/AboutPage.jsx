import React from "react";
import { Link } from "react-router-dom";
import { Brain, Cloud, Globe, Lock, Users } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="font-sans selection:bg-green-200 selection:text-green-900">

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
