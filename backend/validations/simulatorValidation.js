const { z } = require("zod");

const baselineSchema = z.object({
  transportCO2: z.number().min(0),
  electricityCO2: z.number().min(0),
  wasteCO2: z.number().min(0),
  plasticCO2: z.number().min(0),
  totalCO2: z.number().min(0),
  ecoScore: z.number().min(0).max(100),
});

const adjustmentsSchema = z.object({
  transportationPct: z.number().min(0).max(100),
  electricityPct: z.number().min(0).max(100),
  wastePct: z.number().min(0).max(100),
  plasticPct: z.number().min(0).max(100),
});

const simulationCalculateSchema = z.object({
  baseline: baselineSchema,
  adjustments: adjustmentsSchema,
});

module.exports = {
  simulationCalculateSchema,
};
