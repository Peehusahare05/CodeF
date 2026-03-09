import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Lightbulb,
  Zap,
  ShoppingBag,
  Car,
  Droplet,
  Recycle,
  Thermometer,
} from "lucide-react";
import PageHeader from "../components/suggestions/PageHeader";
import ImpactCard from "../components/suggestions/ImpactCard";
import ImpactAreaCard from "../components/suggestions/ImpactAreaCard";
import RecommendationCard from "../components/suggestions/RecommendationCard";
import EcoTipCard from "../components/suggestions/EcoTipCard";
import SimulationCard from "../components/suggestions/SimulationCard";
import CTASection from "../components/suggestions/CTASection";
import Footer from "../components/suggestions/Footer";

const SuggestionsPage = () => {
  const navigate = useNavigate();
  const result = useMemo(() => {
    const stored = localStorage.getItem("ecotrack_result");
    return stored ? JSON.parse(stored) : null;
  }, []);

  const weekly = result?.totalCO2 ?? 42;
  const ecoScore = result?.ecoScore ?? 72;

  return (
    <div className="min-h-screen bg-[#f8fafc] px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <PageHeader onRecalculate={() => navigate("/track")} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-7">
          <div className="lg:col-span-2">
            <ImpactCard
              weekly={weekly}
              ecoScore={ecoScore}
              insight="Transportation contributes the largest share of your emissions."
            />
          </div>
          <ImpactAreaCard category="Transportation" share={45} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-7">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              AI Recommendations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <RecommendationCard
                icon={<Car className="w-5 h-5 text-red-500" />}
                impact="high"
                title="Use Public Transport Weekly"
                description="Swap your daily commute for bus or train rides to significantly lower transit emissions."
                reduction="Reduce 12 kg CO2 / month"
              />
              <RecommendationCard
                icon={<Zap className="w-5 h-5 text-amber-500" />}
                impact="medium"
                title="Reduce Electricity Consumption"
                description="Unplug standby devices and switch to LED bulbs to optimize home energy usage."
                reduction="Reduce 8 kg CO2 / month"
              />
              <RecommendationCard
                icon={<ShoppingBag className="w-5 h-5 text-blue-500" />}
                impact="low"
                title="Switch to Reusable Bags"
                description="Carry a cloth bag for grocery runs to eliminate single-use plastic waste."
                reduction="Reduce 4 kg CO2 / month"
              />
            </div>
          </div>

          <aside>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Quick Eco-Tips
            </h2>
            <div className="space-y-3">
              <EcoTipCard
                icon={<Lightbulb className="w-4 h-4 text-slate-500" />}
                tip="Turn off lights when leaving"
              />
              <EcoTipCard
                icon={<Droplet className="w-4 h-4 text-slate-500" />}
                tip="Use reusable water bottles"
              />
              <EcoTipCard
                icon={<Recycle className="w-4 h-4 text-slate-500" />}
                tip="Start a kitchen compost bin"
              />
              <EcoTipCard
                icon={<Thermometer className="w-4 h-4 text-slate-500" />}
                tip="Lower heat by 1-2 degrees"
              />
            </div>
          </aside>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-7">
          <div className="lg:col-span-2">
            <SimulationCard
              current={weekly}
              after={Math.max(weekly - 12, 10)}
              saved={12}
            />
          </div>
          <div className="rounded-2xl bg-green-50 border border-green-100 p-6 self-start">
            <h3 className="text-2xl font-bold text-green-800 mb-2">
              Did you know?
            </h3>
            <p className="text-sm text-green-900/80">
              The average person generates 7 tons of CO2 annually. By following
              these suggestions, you can reduce your emissions significantly
              over the year.
            </p>
          </div>
        </div>

        <CTASection />
        <Footer />
      </div>
    </div>
  );
};

export default SuggestionsPage;
