import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import {
    buildArticleSchema,
    buildBreadcrumbSchema,
    buildFaqSchema,
    buildWebPageSchema,
} from "../utils/seoSchema";

const SustainabilityPracticesPage = () => (
    <div className="mx-auto max-w-5xl space-y-6 font-sans px-4 py-6 sm:px-6 lg:px-8">
        <SEO
            title="Best Sustainability Practices"
            description="Discover best sustainability practices for households and professionals including waste reduction, energy efficiency, and mindful consumption."
            path="/best-sustainability-practices"
            keywords="best sustainability practices, sustainable lifestyle habits, green living tips"
            structuredData={[
                buildWebPageSchema({
                    title: "Best Sustainability Practices",
                    description:
                        "Actionable sustainability practices for long-term reduction in personal carbon footprint.",
                    path: "/best-sustainability-practices",
                }),
                buildArticleSchema({
                    title: "Best Sustainability Practices",
                    description:
                        "Actionable sustainability practices for long-term reduction in personal carbon footprint.",
                    path: "/best-sustainability-practices",
                    datePublished: "2026-03-23",
                }),
                buildBreadcrumbSchema([
                    { name: "Home", path: "/" },
                    { name: "Best Sustainability Practices", path: "/best-sustainability-practices" },
                ]),
                buildFaqSchema([
                    {
                        question: "What are the best sustainability practices for beginners?",
                        answer:
                            "Start with low-friction habits such as reducing food waste, minimizing standby energy use, and replacing single-use plastics with reusable alternatives.",
                    },
                    {
                        question: "How often should I review sustainability progress?",
                        answer:
                            "A weekly review cadence is effective because it captures behavior patterns and allows quick adjustment of reduction strategies.",
                    },
                ]),
            ]}
        />

        <header className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Best Sustainability Practices</h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                Build durable low-carbon habits with practical routines you can measure and improve.
            </p>
        </header>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-xl font-semibold text-slate-900">Daily high-impact practices</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-600 sm:text-base">
                <li>Use efficient appliances and avoid unnecessary AC runtime.</li>
                <li>Plan meals and shopping to reduce food and packaging waste.</li>
                <li>Prefer shared or public transport for recurring trips.</li>
                <li>Track trends and adjust actions monthly for continuous improvement.</li>
            </ul>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">Measure and iterate</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
                Sustainability is strongest when measured. Use EcoTrack dashboards and AI recommendations to focus on what reduces the most CO2 in your routine.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-sm font-medium">
                <Link to="/dashboard" className="rounded-full border border-slate-200 px-3 py-1.5 text-slate-700 hover:border-emerald-200 hover:text-emerald-700">Sustainability Dashboard</Link>
                <Link to="/ai-advisor" className="rounded-full border border-slate-200 px-3 py-1.5 text-slate-700 hover:border-emerald-200 hover:text-emerald-700">AI Advisor</Link>
            </div>
        </section>
    </div>
);

export default SustainabilityPracticesPage;
