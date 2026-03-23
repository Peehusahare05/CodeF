import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import {
    buildArticleSchema,
    buildBreadcrumbSchema,
    buildFaqSchema,
    buildWebPageSchema,
} from "../utils/seoSchema";

const ReduceCarbonPage = () => (
    <div className="mx-auto max-w-5xl space-y-6 font-sans px-4 py-6 sm:px-6 lg:px-8">
        <SEO
            title="How To Reduce Carbon Footprint"
            description="Learn practical ways to reduce carbon footprint through transport, electricity, waste, and consumption changes with measurable weekly impact."
            path="/how-to-reduce-carbon-footprint"
            keywords="how to reduce carbon footprint, carbon reduction tips, eco-friendly habits"
            structuredData={[
                buildWebPageSchema({
                    title: "How To Reduce Carbon Footprint",
                    description:
                        "Practical carbon reduction methods across transportation, home energy, waste, and consumption.",
                    path: "/how-to-reduce-carbon-footprint",
                }),
                buildArticleSchema({
                    title: "How To Reduce Carbon Footprint",
                    description:
                        "Practical carbon reduction methods across transportation, home energy, waste, and consumption.",
                    path: "/how-to-reduce-carbon-footprint",
                    datePublished: "2026-03-23",
                }),
                buildBreadcrumbSchema([
                    { name: "Home", path: "/" },
                    { name: "How To Reduce Carbon Footprint", path: "/how-to-reduce-carbon-footprint" },
                ]),
                buildFaqSchema([
                    {
                        question: "What is the fastest way to reduce carbon footprint?",
                        answer:
                            "Start with your highest-emission category, usually transport or electricity, and apply two high-impact weekly changes consistently.",
                    },
                    {
                        question: "How can I track if my carbon reduction plan is working?",
                        answer:
                            "Use a weekly carbon tracker and compare trend data over at least four weeks to verify sustained CO2 reduction.",
                    },
                ]),
            ]}
        />

        <header className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">How To Reduce Carbon Footprint</h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                A practical guide to lowering weekly emissions with measurable steps you can track inside EcoTrack.
            </p>
        </header>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-xl font-semibold text-slate-900">1. Reduce transport emissions first</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
                Replace at least two short private-vehicle trips each week with walking, cycling, or public transport. This often creates the biggest immediate reduction.
            </p>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">Action checklist</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600 sm:text-base">
                <li>Batch errands in one route.</li>
                <li>Use public transit for recurring commute days.</li>
                <li>Track weekly travel distance and compare trend.</li>
            </ul>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-xl font-semibold text-slate-900">2. Cut electricity and appliance waste</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
                Reduce standby loads, optimize AC usage, and switch to efficient lighting to lower home energy demand.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-sm font-medium">
                <Link to="/track" className="rounded-full border border-slate-200 px-3 py-1.5 text-slate-700 hover:border-emerald-200 hover:text-emerald-700">Track Emissions</Link>
                <Link to="/dashboard" className="rounded-full border border-slate-200 px-3 py-1.5 text-slate-700 hover:border-emerald-200 hover:text-emerald-700">View Dashboard</Link>
                <Link to="/suggestions" className="rounded-full border border-slate-200 px-3 py-1.5 text-slate-700 hover:border-emerald-200 hover:text-emerald-700">Get AI Suggestions</Link>
            </div>
        </section>
    </div>
);

export default ReduceCarbonPage;
