import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-green-200 selection:text-green-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 text-white py-24 px-6">
        {/* Decorative blur blobs */}
        <div className="absolute top-0 -left-20 w-[400px] h-[400px] bg-green-400/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 -right-20 w-[500px] h-[500px] bg-emerald-400/20 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-green-100 text-sm font-bold tracking-wide uppercase mb-6 backdrop-blur-md">
            Our Mission
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Empowering individuals to build a <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-green-300">Sustainable Future.</span>
          </h1>
          <p className="text-lg md:text-xl text-green-100/80 max-w-2xl mx-auto leading-relaxed">
            EcoTrack was built with a simple premise: if everyone understood their personal environmental impact, we could collectively change the world.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-5xl mx-auto px-6 py-20 -mt-10 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Context */}
            <div className="p-10 md:p-14 flex flex-col justify-center">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-sm">
                🌍
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Why EcoTrack?</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Climate change is the defining challenge of our generation. While large corporations play a major role, individual actions collectively account for nearly <strong className="text-slate-800">70% of global greenhouse gas emissions</strong>. 
              </p>
              <p className="text-slate-600 leading-relaxed">
                We realized that most people want to live sustainably, but they don't know where to start or how much impact their daily choices actually make. EcoTrack solves this by translating complex lifestyle data into readable, actionable insights.
              </p>
            </div>

            {/* Visual/Stats Grid */}
            <div className="bg-slate-50 p-10 md:p-14 border-l border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { label: "CO₂ Tracked", value: "0", sub: "kg so far (Demo)", icon: "☁️" },
                { label: "Community", value: "Open", sub: "For everyone", icon: "🌱" },
                { label: "Intelligence", value: "AI", sub: "Powered analysis", icon: "🧠" },
                { label: "Privacy", value: "100%", sub: "Local & Secure", icon: "🔒" },
              ].map((stat, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col">
                  <span className="text-2xl mb-3">{stat.icon}</span>
                  <div className="text-2xl font-extrabold text-slate-800 mb-1">{stat.value}</div>
                  <div className="text-sm font-semibold text-slate-900">{stat.label}</div>
                  <div className="text-xs text-slate-500 mt-1">{stat.sub}</div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 mb-6">Ready to make a difference?</h2>
        <p className="text-slate-600 mb-10 text-lg">
          Join the platform today, start tracking your daily carbon footprint, and take the first step towards a greener, healthier planet.
        </p>
        <Link 
          to="/auth" 
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold px-10 py-4 rounded-full shadow-lg shadow-green-600/30 hover:shadow-green-600/50 hover:-translate-y-1 transition-all text-lg"
        >
          Start Your Journey
        </Link>
      </section>

      {/* Footer minimal */}
      <footer className="bg-white border-t border-slate-200 py-10 text-center text-slate-500 shadow-inner">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-2xl">🌱</span>
          <span className="font-extrabold text-xl text-green-700">EcoTrack</span>
        </div>
        <p className="text-sm">Built with passion for the environment and technology.</p>
        <p className="text-xs mt-2 text-slate-400">© 2024 EcoTrack. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutPage;
