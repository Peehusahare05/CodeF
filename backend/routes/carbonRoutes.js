const express = require("express");
const router = express.Router();
const {
  saveResult,
  getHistory,
  getLeaderboard,
  getStats,
  deleteEntry,
} = require("../controllers/carbonController");
const { protect } = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");
const {
  saveResultSchema,
  historyQuerySchema,
  deleteParamsSchema,
} = require("../validations/carbonValidation");

router.post("/save", protect, validate(saveResultSchema), saveResult);
router.get(
  "/history",
  protect,
  validate(historyQuerySchema, "query"),
  getHistory,
);
router.get("/stats", protect, getStats);
router.delete(
  "/history/:id",
  protect,
  validate(deleteParamsSchema, "params"),
  deleteEntry,
);
router.get("/leaderboard", getLeaderboard); // Public

module.exports = router;
