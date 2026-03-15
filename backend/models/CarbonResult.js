const mongoose = require("mongoose");

const carbonResultSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    inputs: {
      transportType: String,
      distance: Number,
      electricity: Number,
      waste: Number,
      plastic: String,
    },
    results: {
      transportCO2: Number,
      electricityCO2: Number,
      wasteCO2: Number,
      plasticCO2: Number,
      totalCO2: Number,
      ecoScore: Number,
    },
    insight: { type: String, default: "" },
    trend: [{ week: String, value: Number }],
  },
  { timestamps: true },
);

carbonResultSchema.index({ user: 1, createdAt: -1 });
carbonResultSchema.index({ "results.ecoScore": -1 });

module.exports = mongoose.model("CarbonResult", carbonResultSchema);
