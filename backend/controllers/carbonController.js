const CarbonResult = require("../models/CarbonResult");
const { calculateCarbon, generateInsight } = require("../utils/carbonEngine");

// @route  POST /api/carbon/calculate
// @access Private
const calculate = async (req, res) => {
  try {
    const results = calculateCarbon(req.body);
    const insight = generateInsight(results);

    res.status(200).json({
      data: {
        inputs: req.body,
        results,
        insight,
      },
    });
  } catch (error) {
    console.error("Calculate error:", error);
    res.status(500).json({ message: "Failed to calculate carbon footprint." });
  }
};

// @route  POST /api/carbon/save
// @access Private
const saveResult = async (req, res) => {
  try {
    const { inputs, results, insight, trend } = req.body;
    const record = await CarbonResult.create({
      user: req.user._id,
      inputs,
      results,
      insight: insight || "",
      trend: trend || [],
    });
    res.status(201).json({
      message: "Result saved.",
      data: {
        id: record._id,
        createdAt: record.createdAt,
      },
    });
  } catch (error) {
    console.error("Save result error:", error);
    res.status(500).json({ message: "Failed to save result." });
  }
};

// @route  GET /api/carbon/history
// @access Private
const getHistory = async (req, res) => {
  try {
    const page = Math.max(1, Number.parseInt(req.query.page || "1", 10));
    const limit = Math.min(
      100,
      Math.max(1, Number.parseInt(req.query.limit || "10", 10)),
    );
    const skip = (page - 1) * limit;

    const query = { user: req.user._id };

    const [records, total] = await Promise.all([
      CarbonResult.find(query)
        .select("inputs results insight trend createdAt")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      CarbonResult.countDocuments(query),
    ]);

    res.status(200).json({
      data: records,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch history." });
  }
};

// @route  GET /api/carbon/leaderboard
// @access Public
const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await CarbonResult.aggregate([
      {
        $group: {
          _id: "$user",
          avgEcoScore: { $avg: "$results.ecoScore" },
          totalCO2: { $sum: "$results.totalCO2" },
          submissions: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      { $unwind: "$userInfo" },
      {
        $project: {
          name: "$userInfo.name",
          avgEcoScore: { $round: ["$avgEcoScore", 0] },
          totalCO2: { $round: ["$totalCO2", 2] },
          submissions: 1,
        },
      },
      { $sort: { avgEcoScore: -1 } },
      { $limit: 20 },
    ]);

    const ranked = leaderboard.map((item, index) => ({
      ...item,
      rank: index + 1,
    }));

    res.set("Cache-Control", "public, max-age=60");
    res.status(200).json({ data: ranked });
  } catch (error) {
    console.error("Leaderboard error:", error);
    res.status(500).json({ message: "Failed to fetch leaderboard." });
  }
};

// @route  GET /api/carbon/stats
// @access Private
const getStats = async (req, res) => {
  try {
    const [summary] = await CarbonResult.aggregate([
      { $match: { user: req.user._id } },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: "$user",
          totalSubmissions: { $sum: 1 },
          avgEcoScoreRaw: { $avg: "$results.ecoScore" },
          avgCO2Raw: { $avg: "$results.totalCO2" },
          latestEcoScore: { $first: "$results.ecoScore" },
          latestCO2: { $first: "$results.totalCO2" },
        },
      },
      {
        $project: {
          _id: 0,
          totalSubmissions: 1,
          avgEcoScore: { $round: ["$avgEcoScoreRaw", 0] },
          avgCO2: { $round: ["$avgCO2Raw", 2] },
          latestEcoScore: { $ifNull: ["$latestEcoScore", 0] },
          latestCO2: { $ifNull: ["$latestCO2", 0] },
        },
      },
    ]).allowDiskUse(false);

    if (!summary) {
      return res.status(200).json({
        data: {
          totalSubmissions: 0,
          avgEcoScore: 0,
          avgCO2: 0,
          latestEcoScore: 0,
          latestCO2: 0,
        },
      });
    }

    res.status(200).json({ data: summary });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch stats." });
  }
};

// @route  DELETE /api/carbon/history/:id
// @access Private
const deleteEntry = async (req, res) => {
  try {
    const entry = await CarbonResult.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!entry) {
      return res.status(404).json({ message: "Entry not found." });
    }
    await entry.deleteOne();
    res.status(200).json({ message: "Entry deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete entry." });
  }
};

module.exports = {
  calculate,
  saveResult,
  getHistory,
  getLeaderboard,
  getStats,
  deleteEntry,
};
