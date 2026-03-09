const CarbonResult = require("../models/CarbonResult");

// @route  POST /api/carbon/save
// @access Private
const saveResult = async (req, res) => {
  try {
    const { inputs, results } = req.body;
    const record = await CarbonResult.create({
      user: req.user._id,
      inputs,
      results,
    });
    res.status(201).json({ message: "Result saved.", data: record });
  } catch (error) {
    console.error("Save result error:", error);
    res.status(500).json({ message: "Failed to save result." });
  }
};

// @route  GET /api/carbon/history
// @access Private
const getHistory = async (req, res) => {
  try {
    const records = await CarbonResult.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(10);
    res.status(200).json({ data: records });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch history." });
  }
};

module.exports = { saveResult, getHistory };
