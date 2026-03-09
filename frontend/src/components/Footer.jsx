// Footer.jsx
import React from "react";

const Footer = () => (
  <footer className="bg-slate-50 pt-16 pb-6 px-4 mt-20 border-t border-slate-100">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-8">
      {/* Col 1 */}
      <div>
        <div className="font-extrabold text-2xl text-green-700 mb-2">
          EcoTrack
        </div>
        <p className="text-slate-600 text-sm">
          Empowering individuals to make data-driven choices for a greener
          world. Through AI and insights, we help you track and reduce your
          impact.
        </p>
      </div>
      {/* Col 2 */}
      <div>
        <div className="font-bold text-slate-800 mb-2">Platform</div>
        <ul className="space-y-1 text-slate-600 text-sm">
          <li>
            <a href="#how" className="hover:text-green-600">
              How it Works
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-green-600">
              Pricing
            </a>
          </li>
          <li>
            <a href="#leaderboard" className="hover:text-green-600">
              Leaderboard
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-green-600">
              Mobile App
            </a>
          </li>
        </ul>
      </div>
      {/* Col 3 */}
      <div>
        <div className="font-bold text-slate-800 mb-2">Resources</div>
        <ul className="space-y-1 text-slate-600 text-sm">
          <li>
            <a href="#" className="hover:text-green-600">
              Sustainability Blog
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-green-600">
              Help Center
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-green-600">
              API Docs
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-green-600">
              Partnerships
            </a>
          </li>
        </ul>
      </div>
      {/* Col 4 */}
      <div>
        <div className="font-bold text-slate-800 mb-2">Newsletter</div>
        <form className="flex gap-2 mt-2">
          <input
            type="email"
            placeholder="Email"
            className="rounded-full px-4 py-2 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-green-200 bg-white text-slate-700"
          />
          <button
            className="rounded-full bg-green-600 hover:bg-green-700 text-white px-5 py-2 font-semibold shadow transition"
            type="submit"
          >
            →
          </button>
        </form>
      </div>
    </div>
    <div className="flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 border-t border-slate-100 pt-4">
      <div className="mb-2 md:mb-0">
        © 2026 EcoTrack Systems. All rights reserved.
      </div>
      <div className="flex gap-4">
        <a href="#" className="hover:text-green-600">
          Privacy Policy
        </a>
        <a href="#" className="hover:text-green-600">
          Terms of Service
        </a>
        <a href="#" className="hover:text-green-600">
          Cookie Settings
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
