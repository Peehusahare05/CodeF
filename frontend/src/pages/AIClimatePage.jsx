import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import {
    buildArticleSchema,
    buildBreadcrumbSchema,
    buildFaqSchema,
    buildWebPageSchema,
} from "../utils/seoSchema";

const AIClimatePage = () => (
    <div className="mx-auto max-w-5xl space-y-6 font-sans px-4 py-6 sm:px-6 lg:px-8">
        <SEO
            title="AI For Climate Change"
            description="Understand how AI for climate change helps forecast emissions, personalize reduction plans, and improve sustainability outcomes."
            path="/ai-for-climate-change"
            keywords="AI for climate change, AI sustainability tools, carbon analytics AI"
            structuredData={[
                buildWebPageSchema({
                    title: "AI For Climate Change",
                    description:
                        "How AI systems support climate action through analytics, forecasting, and behavior-focused recommendations.",
                    path: "/ai-for-climate-change",
                }),
                buildArticleSchema({
                    title: "AI For Climate Change",
                    description:
                        "How AI systems support climate action through analytics, forecasting, and behavior-focused recommendations.",
                    path: "/ai-for-climate-change",
                    datePublished: "2026-03-23",
                }),
                buildBreadcrumbSchema([
                    { name: "Home", path: "/" },
                    { name: "AI For Climate Change", path: "/ai-for-climate-change" },
                ]),
                buildFaqSchema([
                    {
                        question: "How does AI help with climate change mitigation?",
                        answer:
                            "AI helps detect high-impact emission patterns, forecast outcomes, and recommend practical interventions that reduce total carbon output.",
                    },
                    {
                        question: "Is AI useful for personal sustainability planning?",
                        answer:
                            "Yes. AI can personalize reduction plans based on your own behavior, making sustainability actions more relevant and effective.",
                    },
                ]),
            ]}
        />

        <header className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">AI For Climate Change</h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                AI systems can turn complex climate data into practical decisions that improve sustainability outcomes at individual and organizational levels.
            </p>
        </header>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-xl font-semibold text-slate-900">Where AI creates real impact</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-600 sm:text-base">
                <li>Emission pattern analysis from behavioral data.</li>
                <li>Personalized carbon reduction tips by category.</li>
                <li>Progress forecasting with trend-based analytics.</li>
            </ul>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">Apply AI insights in EcoTrack</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
                Use AI recommendations and advisor prompts together, then validate reductions in your dashboard over weekly cycles.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-sm font-medium">
                <Link to="/ai-advisor" className="rounded-full border border-slate-200 px-3 py-1.5 text-slate-700 hover:border-emerald-200 hover:text-emerald-700">Open AI Advisor</Link>
                <Link to="/suggestions" className="rounded-full border border-slate-200 px-3 py-1.5 text-slate-700 hover:border-emerald-200 hover:text-emerald-700">View Suggestions</Link>
                <Link to="/dashboard" className="rounded-full border border-slate-200 px-3 py-1.5 text-slate-700 hover:border-emerald-200 hover:text-emerald-700">Track Progress</Link>
            </div>
        </section>
    </div>
);

export default AIClimatePage;
