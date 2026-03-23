// Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Github,
  Leaf,
  Linkedin,
  Mail,
  Twitter,
} from "lucide-react";

const Footer = () => (
  <footer className="mt-20 border-t border-gray-200 bg-gray-50 px-4 py-12">
    <div className="mx-auto max-w-7xl">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {/* Column 1: Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-green-600">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
              <Leaf className="h-5 w-5" strokeWidth={2} />
            </span>
            <span className="text-2xl font-bold tracking-tight text-green-700">
              EcoTrack
            </span>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-gray-600">
            Empowering individuals to make data-driven decisions for a greener
            world through AI-powered sustainability insights.
          </p>
          <div className="flex items-center gap-3 pt-1">
            <a
              href="#"
              aria-label="GitHub"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition duration-200 hover:scale-110 hover:text-green-600"
            >
              <Github className="h-5 w-5" strokeWidth={2} />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition duration-200 hover:scale-110 hover:text-green-600"
            >
              <Linkedin className="h-5 w-5" strokeWidth={2} />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition duration-200 hover:scale-110 hover:text-green-600"
            >
              <Twitter className="h-5 w-5" strokeWidth={2} />
            </a>
          </div>
        </div>
        {/* Column 2: Platform Links */}
        <div className="space-y-4">
          <h4 className="text-base font-semibold text-gray-900">Platform</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <a href="/#how" className="transition-colors hover:text-green-600">
                How It Works
              </a>
            </li>
            <li>
              <Link to="/dashboard" className="transition-colors hover:text-green-600">Carbon Dashboard</Link>
            </li>
            <li>
              <Link to="/track" className="transition-colors hover:text-green-600">Carbon Tracker</Link>
            </li>
            <li>
              <Link to="/ai-advisor" className="transition-colors hover:text-green-600">AI Advisor</Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Resources */}
        <div className="space-y-4">
          <h4 className="text-base font-semibold text-gray-900">Resources</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <Link to="/how-to-reduce-carbon-footprint" className="transition-colors hover:text-green-600">How to Reduce Carbon Footprint</Link>
            </li>
            <li>
              <Link to="/best-sustainability-practices" className="transition-colors hover:text-green-600">Best Sustainability Practices</Link>
            </li>
            <li>
              <Link to="/ai-for-climate-change" className="transition-colors hover:text-green-600">AI for Climate Change</Link>
            </li>
            <li>
              <Link to="/suggestions" className="transition-colors hover:text-green-600">AI Sustainability Suggestions</Link>
            </li>
            <li>
              <Link to="/seo-hub" className="transition-colors hover:text-green-600">SEO Hub</Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div className="space-y-4">
          <h4 className="text-base font-semibold text-gray-900">Newsletter</h4>
          <p className="text-sm text-gray-600">
            Get weekly tips for a low-carbon lifestyle.
          </p>
          <form className="space-y-3">
            <label className="sr-only" htmlFor="newsletter-email">
              Email address
            </label>
            <div className="flex items-center gap-2">
              <div className="flex flex-1 items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-green-200">
                <Mail className="h-5 w-5 text-gray-400" strokeWidth={2} />
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="Email"
                  className="w-full bg-transparent text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
                />
              </div>
              <button
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-green-600 text-white shadow-sm transition hover:shadow-lg"
                type="submit"
                aria-label="Subscribe to newsletter"
              >
                <ArrowRight className="h-5 w-5" strokeWidth={2} />
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-gray-200 pt-5 text-xs text-gray-500 md:flex-row md:items-center">
        <p>© 2026 EcoTrack Systems. All rights reserved.</p>
        <div className="flex flex-wrap items-center gap-5">
          <a href="#" className="transition-colors hover:text-green-600">
            Privacy Policy
          </a>
          <a href="#" className="transition-colors hover:text-green-600">
            Terms of Service
          </a>
          <a href="#" className="transition-colors hover:text-green-600">
            Cookie Settings
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
