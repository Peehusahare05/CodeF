const TRANSPORT_FACTORS = {
  car: 0.21,
  ev: 0.05,
  bike: 0.12,
  bus: 0.08,
  train: 0.06,
  walking: 0,
};

const PLASTIC_FACTORS = {
  low: 1,
  medium: 3,
  high: 6,
};

function calculateCarbon(inputs) {
  const { transportType, distance, electricity, waste, plastic } = inputs;

  const factor = TRANSPORT_FACTORS[transportType] ?? 0;
  const transportCO2 = Number((factor * distance * 7).toFixed(2));
  const electricityCO2 = Number((electricity * 0.82 * 7).toFixed(2));
  const wasteCO2 = Number((waste * 0.5).toFixed(2));
  const plasticCO2 = Number((PLASTIC_FACTORS[plastic] ?? 1).toFixed(2));

  const totalCO2 = Number(
    (transportCO2 + electricityCO2 + wasteCO2 + plasticCO2).toFixed(2),
  );
  const ecoScore = Math.max(0, Math.min(100, Math.round(100 - totalCO2 * 1.5)));

  return {
    transportCO2,
    electricityCO2,
    wasteCO2,
    plasticCO2,
    totalCO2,
    ecoScore,
  };
}

function getImpactLevel(totalCO2) {
  if (totalCO2 <= 20) return "Low";
  if (totalCO2 <= 50) return "Medium";
  return "High";
}

function generateInsight(results) {
  const categories = [
    { key: "transport", label: "Transportation", value: results.transportCO2 },
    { key: "electricity", label: "Electricity", value: results.electricityCO2 },
    { key: "waste", label: "Waste", value: results.wasteCO2 },
    { key: "plastic", label: "Plastic", value: results.plasticCO2 },
  ];

  const highest = categories.reduce((a, b) => (a.value > b.value ? a : b));
  const suggestionMap = {
    transport: "Use public transit, carpooling, or biking for short trips.",
    electricity: "Lower appliance standby usage and optimize AC usage.",
    waste: "Segregate waste and start composting organic material.",
    plastic: "Replace single-use plastic with reusable alternatives.",
  };

  return {
    highestContributor: highest.label,
    impactLevel: getImpactLevel(results.totalCO2),
    summary: `${highest.label} is your highest contributor this week.`,
    primarySuggestion: suggestionMap[highest.key],
  };
}

function generateSuggestionsFromResults(results) {
  const suggestions = [];

  if (
    results.transportCO2 >= results.electricityCO2 &&
    results.transportCO2 >= 10
  ) {
    suggestions.push({
      category: "Transportation",
      title: "Reduce commute emissions",
      action: "Switch 2-3 weekly trips to public transport or cycling.",
      estimatedReductionKgPerWeek: Number(
        (results.transportCO2 * 0.2).toFixed(2),
      ),
    });
  }

  if (results.electricityCO2 >= 8) {
    suggestions.push({
      category: "Electricity",
      title: "Cut household electricity usage",
      action: "Turn off standby devices and use efficient lighting.",
      estimatedReductionKgPerWeek: Number(
        (results.electricityCO2 * 0.15).toFixed(2),
      ),
    });
  }

  if (results.wasteCO2 >= 3) {
    suggestions.push({
      category: "Waste",
      title: "Improve waste habits",
      action: "Start segregation and composting for organic waste.",
      estimatedReductionKgPerWeek: Number((results.wasteCO2 * 0.2).toFixed(2)),
    });
  }

  if (results.plasticCO2 >= 2) {
    suggestions.push({
      category: "Plastic",
      title: "Cut single-use plastic",
      action: "Carry reusable bag and bottle to lower packaging waste.",
      estimatedReductionKgPerWeek: Number(
        (results.plasticCO2 * 0.25).toFixed(2),
      ),
    });
  }

  if (suggestions.length === 0) {
    suggestions.push({
      category: "General",
      title: "Maintain your strong eco habits",
      action: "You are doing well. Keep tracking consistently.",
      estimatedReductionKgPerWeek: 1,
    });
  }

  return suggestions;
}

function simulateReduction(baseline, adjustments) {
  const applyReduction = (value, percentage) =>
    Math.max(0, value - (value * percentage) / 100);

  const reduced = {
    transportCO2: applyReduction(
      baseline.transportCO2,
      adjustments.transportationPct,
    ),
    electricityCO2: applyReduction(
      baseline.electricityCO2,
      adjustments.electricityPct,
    ),
    wasteCO2: applyReduction(baseline.wasteCO2, adjustments.wastePct),
    plasticCO2: applyReduction(baseline.plasticCO2, adjustments.plasticPct),
  };

  reduced.totalCO2 = Number(
    (
      reduced.transportCO2 +
      reduced.electricityCO2 +
      reduced.wasteCO2 +
      reduced.plasticCO2
    ).toFixed(2),
  );
  reduced.ecoScore = Math.max(
    0,
    Math.min(100, Math.round(100 - reduced.totalCO2 * 1.5)),
  );

  const baselineTotal = baseline.totalCO2;
  const reducedBy = Number((baselineTotal - reduced.totalCO2).toFixed(2));
  const reductionPct =
    baselineTotal > 0
      ? Number(((reducedBy / baselineTotal) * 100).toFixed(1))
      : 0;

  return {
    baseline,
    projected: reduced,
    reduction: {
      reducedByKgPerWeek: reducedBy,
      reducedByPercent: reductionPct,
      ecoScoreDelta: reduced.ecoScore - baseline.ecoScore,
    },
  };
}

module.exports = {
  calculateCarbon,
  generateInsight,
  generateSuggestionsFromResults,
  simulateReduction,
  getImpactLevel,
};
