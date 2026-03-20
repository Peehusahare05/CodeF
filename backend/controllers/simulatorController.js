const { simulateReduction } = require("../utils/carbonEngine");

// @route  POST /api/simulator/calculate
// @access Private
const calculateSimulation = async (req, res) => {
  try {
    const { baseline, adjustments } = req.body;
    const projection = simulateReduction(baseline, adjustments);

    return res.status(200).json({
      data: projection,
    });
  } catch (error) {
    console.error("calculateSimulation error:", error);
    return res.status(500).json({ message: "Failed to calculate simulation." });
  }
};

module.exports = { calculateSimulation };
