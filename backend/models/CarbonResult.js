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
  },
  { timestamps: true }
);

module.exports = mongoose.model("CarbonResult", carbonResultSchema);
