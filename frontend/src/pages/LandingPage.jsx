import React from "react";
import HeroSection from "../components/HeroSection";
import ProblemSection from "../components/ProblemSection";
import HowItWorksSection from "../components/HowItWorksSection";
import FeaturesSection from "../components/FeaturesSection";
import DashboardPreviewSection from "../components/DashboardPreviewSection";
import CommunityLeaderboardSection from "../components/CommunityLeaderboardSection";
import FinalCTASection from "../components/FinalCTASection";

const LandingPage = () => (
  <div className="font-sans">
    <HeroSection />
    <ProblemSection />
    <HowItWorksSection />
    <FeaturesSection />
    <DashboardPreviewSection />
    <CommunityLeaderboardSection />
    <FinalCTASection />
  </div>
);

export default LandingPage;

