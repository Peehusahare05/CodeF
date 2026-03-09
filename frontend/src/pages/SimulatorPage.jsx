import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import PageHeader from "../components/simulator/PageHeader";
import FootprintCard from "../components/simulator/FootprintCard";
import ReductionCard from "../components/simulator/ReductionCard";
import ChartCard from "../components/simulator/ChartCard";
import SimulationControls from "../components/simulator/SimulationControls";
import ResultsCard from "../components/simulator/ResultsCard";
import InsightCard from "../components/simulator/InsightCard";
import CTASection from "../components/simulator/CTASection";
import Footer from "../components/simulator/Footer";

const SimulatorPage = () => {
  const navigate = useNavigate();

  // Get baseline data from localStorage using lazy initialization
  const [baselineData] = useState(() => {
    const stored = localStorage.getItem("ecotrack_result");
    if (stored) {
      const data = JSON.parse(stored);
      return {
        total: data.totalCO2 || 0,
        transport: data.transportCO2 || 0,
        electricity: data.electricityCO2 || 0,
        waste: data.wasteCO2 || 0,
        plastic: data.plasticCO2 || 0,
      };
    }
    return {
      total: 450,
      transport: 180,
      electricity: 150,
      waste: 80,
      plastic: 40,
    };
  });

  // Simulation state
  const [changes, setChanges] = useState({
    transport: "none",
    frequency: "daily",
    energy: 0,
    waste: false,
    renewable: false,
  });

  // Calculate reductions based on changes
  const calculations = useMemo(() => {
    let transportReduction = 0;
    let electricityReduction = 0;
    let wasteReduction = 0;
    let plasticReduction = 0;

    // Transport reductions
    const transportMultipliers = {
      none: 0,
      carpool: 0.2,
      public: 0.4,
      bike: 0.6,
      ev: 0.5,
    };

    const frequencyMultipliers = {
      daily: 1,
      weekly: 0.4,
      occasional: 0.2,
    };

    transportReduction =
      baselineData.transport *
      transportMultipliers[changes.transport] *
      frequencyMultipliers[changes.frequency];

    // Energy reduction from slider
    electricityReduction = baselineData.electricity * (changes.energy / 100);

    // Renewable energy bonus
    if (changes.renewable) {
      electricityReduction += baselineData.electricity * 0.7;
    }

    // Waste policy
    if (changes.waste) {
      wasteReduction = baselineData.waste * 0.3;
      plasticReduction = baselineData.plastic * 0.4;
    }

    const totalReduction =
      transportReduction +
      electricityReduction +
      wasteReduction +
      plasticReduction;
    const afterTotal = baselineData.total - totalReduction;
    const percentage = Math.round((totalReduction / baselineData.total) * 100);

    // Calculate new category values
    const categories = [
      {
        name: "Transportation",
        icon: "🚗",
        current: baselineData.transport,
        after: baselineData.transport - transportReduction,
      },
      {
        name: "Electricity",
        icon: "⚡",
        current: baselineData.electricity,
        after: baselineData.electricity - electricityReduction,
      },
      {
        name: "Waste",
        icon: "🗑️",
        current: baselineData.waste,
        after: baselineData.waste - wasteReduction,
      },
      {
        name: "Plastic",
        icon: "♻️",
        current: baselineData.plastic,
        after: baselineData.plastic - plasticReduction,
      },
    ];

    // Calculate eco grade
    const getEcoGrade = (total) => {
      if (total < 200) return "A+";
      if (total < 300) return "A";
      if (total < 400) return "B";
      if (total < 500) return "C";
      if (total < 600) return "D";
      return "F";
    };

    // Calculate trees equivalent (1 tree absorbs ~21 kg CO2/year)
    const trees = Math.round(totalReduction / 21);

    // Calculate savings
    const monthlySavings = totalReduction;
    const yearlySavings = totalReduction * 12;
    const costSavings =
      transportReduction * 0.5 +
      electricityReduction * 0.12 +
      wasteReduction * 0.3;

    // Generate AI insight
    const generateInsight = () => {
      if (percentage >= 30) {
        return "Excellent simulation! Your changes show a significant commitment to sustainability. The combination of transport modifications and energy efficiency creates a powerful impact. Consider implementing these changes gradually over 2-3 months for best results.";
      } else if (percentage >= 15) {
        return "Great progress! These moderate changes balance practicality with environmental impact. You're on the right track. Consider adding one more major change like renewable energy to maximize your reduction.";
      } else if (percentage > 0) {
        return "You're making a start! While these changes are helpful, there's potential for greater impact. Try combining multiple strategies - for example, switching to public transport while also reducing energy consumption.";
      } else {
        return "No changes selected yet. Use the controls on the right to simulate different lifestyle modifications and see their impact on your carbon footprint. Start with small changes and gradually increase your commitment.";
      }
    };

    // Generate recommendations
    const generateRecommendations = () => {
      const recs = [];

      if (changes.transport === "none") {
        recs.push(
          "Consider carpooling or using public transport at least twice per week",
        );
      }

      if (changes.energy < 20) {
        recs.push(
          "Switch to LED bulbs and unplug devices when not in use to save 20-30% energy",
        );
      }

      if (!changes.renewable && electricityReduction > 0) {
        recs.push(
          "Explore solar panel installation or renewable energy plans from your provider",
        );
      }

      if (!changes.waste) {
        recs.push(
          "Start composting food waste and implement strict recycling policies",
        );
      }

      if (recs.length === 0) {
        recs.push("Track your actual consumption weekly to stay on target");
        recs.push("Share your eco-friendly practices with friends and family");
        recs.push("Join local sustainability communities for more tips");
      }

      return recs.slice(0, 3);
    };

    return {
      current: baselineData.total,
      after: afterTotal,
      reduction: totalReduction,
      percentage,
      categories,
      grade: getEcoGrade(afterTotal),
      trees,
      savings: {
        monthly: monthlySavings,
        yearly: yearlySavings,
        cost: costSavings * 12,
      },
      insight: generateInsight(),
      recommendations: generateRecommendations(),
    };
  }, [baselineData, changes]);

  const handleChangeUpdate = (key, value) => {
    setChanges((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setChanges({
      transport: "none",
      frequency: "daily",
      energy: 0,
      waste: false,
      renewable: false,
    });
  };

  const handleApply = () => {
    // Save simulation results to localStorage for tracking
    const simulationData = {
      ...calculations,
      changes,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("ecotrack_simulation", JSON.stringify(simulationData));

    alert(
      "Changes applied successfully! Track your progress in the dashboard.",
    );
    navigate("/dashboard");
  };

  const handleViewDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <PageHeader onReset={handleReset} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Analytics */}
          <div className="lg:col-span-2 space-y-6">
            <FootprintCard
              current={calculations.current}
              reduction={calculations.reduction}
              percentage={calculations.percentage}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ReductionCard
                after={calculations.after}
                saved={calculations.reduction}
                trees={calculations.trees}
                grade={calculations.grade}
              />

              <ResultsCard savings={calculations.savings} />
            </div>

            <ChartCard categories={calculations.categories} />

            <InsightCard
              insight={calculations.insight}
              recommendations={calculations.recommendations}
            />

            <CTASection
              onApply={handleApply}
              onViewDashboard={handleViewDashboard}
            />
          </div>

          {/* Right Column - Controls */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <SimulationControls
                changes={changes}
                onChangeUpdate={handleChangeUpdate}
              />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default SimulatorPage;
