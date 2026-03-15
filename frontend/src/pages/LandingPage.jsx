import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import ProblemSection from "../components/ProblemSection";
import HowItWorksSection from "../components/HowItWorksSection";
import FeaturesSection from "../components/FeaturesSection";
import DashboardPreviewSection from "../components/DashboardPreviewSection";
import CommunityLeaderboardSection from "../components/CommunityLeaderboardSection";
import FinalCTASection from "../components/FinalCTASection";
import Footer from "../components/Footer";

const LandingPage = () => (
  <div className="page-shell font-sans">
    <Navbar />
    <main className="page-main">
      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
      <FeaturesSection />
      <DashboardPreviewSection />
      <CommunityLeaderboardSection />
      <FinalCTASection />
    </main>
    <Footer />
  </div>
);

export default LandingPage;

