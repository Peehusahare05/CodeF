const { z } = require("zod");

const inputsSchema = z
  .object({
    transportType: z.enum(["car", "ev", "bike", "bus", "train", "walking"]),
    distance: z.number().min(0).max(1000),
    electricity: z.number().min(0).max(1000),
    waste: z.number().min(0).max(500),
    plastic: z.enum(["low", "medium", "high"]),
  })
  .optional();

const resultsSchema = z
  .object({
    transportCO2: z.number().min(0),
    electricityCO2: z.number().min(0),
    wasteCO2: z.number().min(0),
    plasticCO2: z.number().min(0),
    totalCO2: z.number().min(0),
    ecoScore: z.number().min(0).max(100),
  })
  .optional();

const suggestionGenerateSchema = z
  .object({
    inputs: inputsSchema,
    results: resultsSchema,
  })
  .default({});

module.exports = {
  suggestionGenerateSchema,
};
