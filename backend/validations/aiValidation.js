const { z } = require("zod");

const aiChatSchema = z.object({
  message: z.string().trim().min(1, "Message is required").max(500),
  context: z
    .object({
      ecoScore: z.number().min(0).max(100).optional(),
      totalCO2: z.number().min(0).optional(),
      transportType: z.string().max(30).optional(),
    })
    .optional()
    .default({}),
});

module.exports = { aiChatSchema };
