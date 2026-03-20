const CarbonResult = require("../models/CarbonResult");
const {
  calculateCarbon,
  generateSuggestionsFromResults,
  generateInsight,
} = require("../utils/carbonEngine");

// @route  POST /api/suggestions/generate
// @access Private
const generateSuggestions = async (req, res) => {
  try {
    let results = req.body?.results;

    if (!results && req.body?.inputs) {
      results = calculateCarbon(req.body.inputs);
    }

    if (!results) {
      const latest = await CarbonResult.findOne({ user: req.user._id })
        .sort({ createdAt: -1 })
        .lean();
      if (!latest?.results) {
        return res.status(404).json({
          message: "No carbon data found. Please track your footprint first.",
        });
      }
      results = latest.results;
    }

    const suggestions = generateSuggestionsFromResults(results);
    const insight = generateInsight(results);

    return res.status(200).json({
      data: {
        results,
        insight,
        suggestions,
      },
    });
  } catch (error) {
    console.error("generateSuggestions error:", error);
    return res.status(500).json({ message: "Failed to generate suggestions." });
  }
};

module.exports = { generateSuggestions };
