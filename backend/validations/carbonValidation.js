const { z } = require("zod");

const objectIdRegex = /^[a-f\d]{24}$/i;

const inputSchema = z.object({
  transportType: z.enum(["car", "ev", "bike", "bus", "train", "walking"]),
  distance: z.number().min(0).max(1000),
  electricity: z.number().min(0).max(1000),
  waste: z.number().min(0).max(500),
  plastic: z.enum(["low", "medium", "high"]),
});

const resultsSchema = z.object({
  transportCO2: z.number().min(0),
  electricityCO2: z.number().min(0),
  wasteCO2: z.number().min(0),
  plasticCO2: z.number().min(0),
  totalCO2: z.number().min(0),
  ecoScore: z.number().min(0).max(100),
});

const trendSchema = z.array(
  z.object({
    week: z.string().min(1).max(30),
    value: z.number().min(0),
  }),
);

const saveResultSchema = z.object({
  inputs: inputSchema,
  results: resultsSchema,
  insight: z.string().max(500).optional().default(""),
  trend: trendSchema.optional().default([]),
});

const historyQuerySchema = z.object({
  page: z.string().regex(/^\d+$/).optional(),
  limit: z.string().regex(/^\d+$/).optional(),
});

const deleteParamsSchema = z.object({
  id: z.string().regex(objectIdRegex, "Invalid entry id"),
});

module.exports = {
  inputSchema,
  saveResultSchema,
  historyQuerySchema,
  deleteParamsSchema,
};
