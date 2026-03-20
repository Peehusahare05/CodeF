export function getImpactLevel(total) {
  if (total < 45) {
    return { label: "Low Impact", tone: "emerald" };
  }

  if (total < 90) {
    return { label: "Medium Impact", tone: "amber" };
  }

  return { label: "High Impact", tone: "rose" };
}

export function buildWeeklyTrend(total, storedTrend) {
  if (Array.isArray(storedTrend) && storedTrend.length >= 3) {
    const normalized = storedTrend.map((item, idx) => ({
      week: item.week || `Week ${idx + 1}`,
      value: Number(item.value) || 0,
    }));

    const hasCurrent = normalized[normalized.length - 1]?.value > 0;
    if (hasCurrent) {
      return normalized.length === 4
        ? normalized
        : [
            { week: "Week 0", value: round1(normalized[0].value * 1.06) },
            ...normalized,
          ].slice(-4);
    }
  }

  return [
    { week: "Week 1", value: round1(total * 1.24) },
    { week: "Week 2", value: round1(total * 1.15) },
    { week: "Week 3", value: round1(total * 1.07) },
    { week: "Week 4", value: round1(total) },
  ];
}

export function buildInsights(values) {
  const entries = [
    { key: "transport", value: values.transport },
    { key: "electricity", value: values.electricity },
    { key: "waste", value: values.waste },
    { key: "plastic", value: values.plastic },
  ].sort((a, b) => b.value - a.value);

  const top = entries[0]?.key;

  const suggestions = {
    transport:
      "Transportation is your largest emitter this week. Shift 2-3 short trips to public transit or shared rides to cut emissions quickly.",
    electricity:
      "Electricity is the dominant source. Focus on high-consumption appliances, standby power, and evening usage to reduce your baseline.",
    waste:
      "Waste has the highest footprint. Segregate recyclables and compost organics to reduce landfill impact over the next cycle.",
    plastic:
      "Plastic usage is leading your emissions mix. Replace single-use packaging with refill or bulk alternatives this week.",
  };

  return {
    primary:
      suggestions[top] ||
      "Your carbon profile is balanced. Keep improving one category every week for steady gains.",
    secondary: `Priority focus: ${toSentence(top)} contributes the most to your weekly total.`,
  };
}

export function buildContributions(values) {
  const rows = [
    { key: "transport", label: "Transportation", value: values.transport },
    { key: "electricity", label: "Electricity", value: values.electricity },
    { key: "waste", label: "Waste", value: values.waste },
    { key: "plastic", label: "Plastic", value: values.plastic },
  ];

  const total = rows.reduce((sum, row) => sum + row.value, 0) || 1;

  return rows.map((row) => ({
    ...row,
    percentage: Math.round((row.value / total) * 100),
  }));
}

export function getTopContributor(contributions) {
  if (!Array.isArray(contributions) || contributions.length === 0) {
    return null;
  }

  return [...contributions].sort((a, b) => b.value - a.value)[0];
}

export function calculateTrendDelta(weeklyTrend) {
  const first = weeklyTrend[0]?.value || 0;
  const latest = weeklyTrend[weeklyTrend.length - 1]?.value || 0;
  if (!first) {
    return { label: "No prior week baseline", isPositive: true };
  }

  const change = ((latest - first) / first) * 100;
  const rounded = Math.abs(change).toFixed(1);

  if (change <= 0) {
    return { label: `${rounded}% lower vs starting week`, isPositive: true };
  }

  return { label: `${rounded}% higher vs starting week`, isPositive: false };
}

function toSentence(value) {
  if (!value) return "overall usage";
  const map = {
    transport: "transportation",
    electricity: "electricity",
    waste: "waste",
    plastic: "plastic",
  };
  return map[value] || value;
}

function round1(value) {
  return Math.round(value * 10) / 10;
}
