import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import {
    buildBreadcrumbSchema,
    buildWebPageSchema,
} from "../utils/seoSchema";

const hubLinks = [
    { title: "Home", path: "/", desc: "EcoTrack sustainability platform overview" },
    { title: "About", path: "/about", desc: "Organization mission and FAQ snippets" },
    { title: "Dashboard", path: "/dashboard", desc: "Carbon footprint dashboard and sustainability analytics" },
    { title: "Track", path: "/track", desc: "Carbon footprint tracker and daily emission calculator" },
    { title: "AI Advisor", path: "/ai-advisor", desc: "AI sustainability advisor and carbon reduction tips" },
    { title: "Suggestions", path: "/suggestions", desc: "Ranked AI sustainability suggestions" },
    { title: "How to Reduce Carbon Footprint", path: "/how-to-reduce-carbon-footprint", desc: "Practical emission reduction playbook" },
    { title: "Best Sustainability Practices", path: "/best-sustainability-practices", desc: "Long-term sustainability habits and routines" },
    { title: "AI for Climate Change", path: "/ai-for-climate-change", desc: "How AI supports measurable climate action" },
];

const SEOHubPage = () => (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-6 font-sans sm:px-6 lg:px-8">
        <SEO
            title="EcoTrack SEO Hub"
            description="Central index of EcoTrack sustainability pages, carbon tracking tools, and AI climate content for stronger topical authority and user discovery."
            path="/seo-hub"
            keywords="EcoTrack SEO hub, sustainability content hub, carbon tracking resources"
            structuredData={[
                buildWebPageSchema({
                    title: "EcoTrack SEO Hub",
                    description:
                        "Central hub linking all EcoTrack ranking pages for sustainability, carbon tracking, and AI climate guidance.",
                    path: "/seo-hub",
                }),
                buildBreadcrumbSchema([
                    { name: "Home", path: "/" },
                    { name: "SEO Hub", path: "/seo-hub" },
                ]),
            ]}
        />

        <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">EcoTrack SEO Hub</h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                This hub connects all high-value EcoTrack pages, helping search engines and users discover your complete carbon tracking and sustainability knowledge graph.
            </p>
        </header>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-xl font-semibold text-slate-900">All Ranking Pages</h2>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {hubLinks.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-emerald-200 hover:bg-emerald-50"
                    >
                        <h3 className="text-sm font-semibold text-slate-900">{item.title}</h3>
                        <p className="mt-1 text-xs leading-relaxed text-slate-600">{item.desc}</p>
                    </Link>
                ))}
            </div>
        </section>

        <section className="sr-only" aria-label="SEO topical authority content">
            <h2>Sustainability knowledge hub</h2>
            <p>
                EcoTrack SEO Hub clusters carbon footprint dashboard, sustainability analytics, AI sustainability advisor, and climate content pages
                to strengthen topical authority for sustainable living and emission reduction search queries.
            </p>
        </section>
    </div>
);

export default SEOHubPage;
