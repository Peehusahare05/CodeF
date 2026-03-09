// Emission factors (kg CO2 per unit)
export const TRANSPORT_FACTORS = {
  car: 0.21,
  ev: 0.05,
  bike: 0.12,
  bus: 0.08,
  train: 0.06,
  walking: 0,
};

export const PLASTIC_FACTORS = {
  low: 1,
  medium: 3,
  high: 6,
};

/**
 * Calculate weekly carbon footprint from daily lifestyle inputs.
 * @param {object} data
 * @param {string} data.transportType  - key from TRANSPORT_FACTORS
 * @param {number} data.distance       - daily travel distance in km
 * @param {number} data.electricity    - average daily kWh usage
 * @param {number} data.waste          - weekly waste in kg
 * @param {string} data.plastic        - 'low' | 'medium' | 'high'
 * @returns {{ transportCO2, electricityCO2, wasteCO2, plasticCO2, totalCO2, ecoScore }}
 */
export function calculateCarbon({ transportType, distance, electricity, waste, plastic }) {
  const factor = TRANSPORT_FACTORS[transportType] ?? 0;

  // Weekly values
  const transportCO2 = parseFloat(((factor * distance) * 7).toFixed(2));
  const electricityCO2 = parseFloat(((electricity * 0.82) * 7).toFixed(2));
  const wasteCO2 = parseFloat((waste * 0.5).toFixed(2));
  const plasticCO2 = parseFloat((PLASTIC_FACTORS[plastic] ?? 1).toFixed(2));

  const totalCO2 = parseFloat((transportCO2 + electricityCO2 + wasteCO2 + plasticCO2).toFixed(2));

  // Eco score: 100 − (total × 1.5), clamped 0–100
  const ecoScore = Math.max(0, Math.min(100, Math.round(100 - totalCO2 * 1.5)));

  return { transportCO2, electricityCO2, wasteCO2, plasticCO2, totalCO2, ecoScore };
}

/**
 * Generate a personalised insight based on which category emits the most.
 */
export function generateInsight({ transportCO2, electricityCO2, wasteCO2, plasticCO2 }) {
  const categories = [
    { label: "transport", value: transportCO2 },
    { label: "electricity", value: electricityCO2 },
    { label: "waste", value: wasteCO2 },
    { label: "plastic", value: plasticCO2 },
  ];
  const highest = categories.reduce((a, b) => (a.value > b.value ? a : b));

  const insights = {
    transport:
      "Transportation contributes the highest portion of your carbon footprint. Consider carpooling, using public transport, or switching to an electric vehicle.",
    electricity:
      "Electricity consumption is your biggest emitter. Try energy-efficient appliances, LED lighting, and reducing standby power usage.",
    waste:
      "Waste production is your highest carbon category. Increasing recycling and composting can significantly reduce your footprint.",
    plastic:
      "Plastic consumption is your top emitter. Opt for reusable items and reduce single-use plastic purchases.",
  };

  return insights[highest.label];
}

/**
 * Generate simulated weekly trend data for the last 3 weeks.
 */
export function generateTrend(totalCO2) {
  return [
    { week: "Week 1", value: parseFloat((totalCO2 * 1.19).toFixed(1)) },
    { week: "Week 2", value: parseFloat((totalCO2 * 1.10).toFixed(1)) },
    { week: "Week 3", value: totalCO2 },
  ];
}
