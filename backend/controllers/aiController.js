// Keyword-based AI chat for sustainability advice
const CarbonResult = require("../models/CarbonResult");

const RESPONSES = [
  {
    keywords: [
      "electric",
      "power",
      "energy",
      "kwh",
      "appliance",
      "light",
      "led",
    ],
    reply:
      "Reducing electricity consumption is one of the most impactful ways to lower your carbon footprint. Start with lighting and standby devices:",
    insight: {
      suggestion: "Switch to LED lighting & smart plugs",
      impact: "Reduce 8–12 kg CO₂ per month",
      tip: "Unplug electronics when not in use — standby mode accounts for up to 10% of household electricity.",
    },
  },
  {
    keywords: [
      "transport",
      "car",
      "drive",
      "driving",
      "commute",
      "travel",
      "petrol",
      "diesel",
      "bike",
      "bicycle",
    ],
    reply:
      "Transportation is often the largest contributor to personal carbon emissions. Here are high-impact steps:",
    insight: {
      suggestion: "Use public transport or cycle for short trips",
      impact: "Reduce 20–40 kg CO₂ per month",
      tip: "Switching even one car commute per week to cycling or public transit makes a measurable difference.",
    },
  },
  {
    keywords: ["waste", "recycl", "trash", "garbage", "landfill", "compost"],
    reply:
      "Good waste management significantly reduces methane emissions from landfills. Here's what you can do:",
    insight: {
      suggestion: "Start composting organic waste",
      impact: "Reduce 5–8 kg CO₂ per month",
      tip: "Composting diverts organic matter from landfills, which produce methane — 80x more potent than CO₂ over 20 years.",
    },
  },
  {
    keywords: ["plastic", "bag", "bottle", "packaging", "single-use", "straw"],
    reply:
      "Reducing single-use plastics cuts both fossil fuel consumption and ocean pollution:",
    insight: {
      suggestion: "Carry a reusable bag and water bottle",
      impact: "Reduce 3–6 kg CO₂ per month",
      tip: "Single-use plastics require significant fossil fuels to produce. Reusables pay back their carbon cost within months.",
    },
  },
  {
    keywords: [
      "food",
      "diet",
      "meat",
      "beef",
      "vegetarian",
      "vegan",
      "plant",
      "eat",
    ],
    reply:
      "Food choices have a surprisingly large impact on carbon footprint — especially red meat consumption:",
    insight: {
      suggestion: "Try Meatless Mondays to start reducing meat",
      impact: "Reduce 15–30 kg CO₂ per month",
      tip: "Beef production emits ~27 kg CO₂ per kg. Replacing one beef meal per week with legumes saves ~50 kg CO₂ annually.",
    },
  },
  {
    keywords: ["water", "shower", "bath", "tap", "leak", "irrigation"],
    reply:
      "Water heating is a significant energy expense — conserving hot water directly cuts CO₂ emissions:",
    insight: {
      suggestion: "Take shorter showers (under 5 minutes)",
      impact: "Reduce 2–4 kg CO₂ per month",
      tip: "A low-flow showerhead can cut water usage by 40% with no loss of pressure.",
    },
  },
  {
    keywords: [
      "solar",
      "renewable",
      "green energy",
      "wind",
      "panel",
      "photovoltaic",
    ],
    reply:
      "Switching to renewable energy is one of the highest-impact changes you can make:",
    insight: {
      suggestion: "Install solar panels or switch to a green energy tariff",
      impact: "Reduce 50–100 kg CO₂ per month",
      tip: "Many utility providers offer green energy plans with little or no extra cost. Check yours today.",
    },
  },
  {
    keywords: [
      "score",
      "improve",
      "better",
      "higher",
      "increase",
      "boost",
      "tips",
      "advice",
      "help",
      "what can",
      "how to",
      "suggestion",
    ],
    reply:
      "To improve your eco score, focus on your highest-impact category. Here's a reliable quick win:",
    insight: {
      suggestion: "Track and reduce daily transport emissions",
      impact: "Increase eco score by 10–20 points",
      tip: "Small consistent changes compound over time. Try walking or cycling for any trip under 3 km.",
    },
  },
  {
    keywords: ["air", "flight", "plane", "aviation", "fly"],
    reply:
      "Aviation has one of the highest per-km carbon costs. Here's how to offset or reduce its impact:",
    insight: {
      suggestion: "Prefer trains over short-haul flights",
      impact: "A train emits ~90% less CO₂ than flying the same route",
      tip: "For trips under 700 km, high-speed rail is typically faster door-to-door and far greener.",
    },
  },
  {
    keywords: ["shopping", "buy", "purchase", "fashion", "cloth", "consume"],
    reply:
      "Consumption habits — especially fast fashion — carry a hidden carbon cost:",
    insight: {
      suggestion: "Buy second-hand or choose quality over quantity",
      impact: "Reduce 10–20 kg CO₂ per month",
      tip: "Extending a garment's life by 9 months reduces its carbon, water, and waste footprint by 20–30%.",
    },
  },
];

const DEFAULT_RESPONSE = {
  reply:
    "I'm here to help you on your sustainability journey! Ask me about electricity, transport, waste, plastic, food, water, or ways to improve your eco score.",
  insight: {
    suggestion: "Start with one small change today",
    impact: "Every action adds up over time",
    tip: "Track your progress weekly using EcoTrack to see how your choices impact your carbon footprint.",
  },
};

function getAIResponse(message, context = {}) {
  const msg = message.toLowerCase();

  // Build context-aware prefix based on eco score
  let prefix = "";
  const { ecoScore } = context;
  if (typeof ecoScore === "number") {
    if (ecoScore >= 70) {
      prefix = `You're doing great with an eco score of ${ecoScore}! `;
    } else if (ecoScore >= 40) {
      prefix = `With your eco score of ${ecoScore}, there's room to improve. `;
    } else {
      prefix = `Your eco score of ${ecoScore} highlights high-impact areas to work on. `;
    }
  }

  for (const rule of RESPONSES) {
    if (rule.keywords.some((kw) => msg.includes(kw))) {
      return { reply: prefix + rule.reply, insight: rule.insight };
    }
  }

  return {
    reply: prefix + DEFAULT_RESPONSE.reply,
    insight: DEFAULT_RESPONSE.insight,
  };
}

async function enrichContextFromLatestResult(context = {}, userId) {
  const enriched = { ...(context || {}) };

  const needsEcoScore = typeof enriched.ecoScore !== "number";
  const needsTotalCO2 = typeof enriched.totalCO2 !== "number";
  const needsTransportType = !enriched.transportType;

  if (!userId || (!needsEcoScore && !needsTotalCO2 && !needsTransportType)) {
    return enriched;
  }

  const latest = await CarbonResult.findOne({ user: userId })
    .sort({ createdAt: -1 })
    .select("results inputs")
    .lean();

  if (!latest) {
    return enriched;
  }

  if (needsEcoScore && typeof latest?.results?.ecoScore === "number") {
    enriched.ecoScore = latest.results.ecoScore;
  }

  if (needsTotalCO2 && typeof latest?.results?.totalCO2 === "number") {
    enriched.totalCO2 = latest.results.totalCO2;
  }

  if (needsTransportType && latest?.inputs?.transportType) {
    enriched.transportType = latest.inputs.transportType;
  }

  return enriched;
}

function hasContextValue(context = {}) {
  return (
    typeof context.ecoScore === "number" ||
    typeof context.totalCO2 === "number" ||
    (typeof context.transportType === "string" && context.transportType.trim())
  );
}

function resolveContextSource(requestContext = {}, enrichedContext = {}) {
  const hasRequestContext = hasContextValue(requestContext);
  const hasFinalContext = hasContextValue(enrichedContext);

  if (!hasFinalContext) {
    return "none";
  }

  if (hasRequestContext) {
    return "request";
  }

  return "enriched";
}

// @route  POST /api/ai/chat
// @access Public (token optional; if valid, missing context is enriched from latest saved result)
const chat = async (req, res) => {
  try {
    const { message, context } = req.body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ message: "Message is required." });
    }

    const requestContext = context || {};
    const enrichedContext = await enrichContextFromLatestResult(
      requestContext,
      req.user?._id,
    );
    const contextSource = resolveContextSource(requestContext, enrichedContext);

    const response = getAIResponse(message.trim(), enrichedContext);
    res.status(200).json({ ...response, contextSource });
  } catch (error) {
    console.error("AI chat error:", error);
    res.status(500).json({ message: "Failed to generate response." });
  }
};

module.exports = { chat };
