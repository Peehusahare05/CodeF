const express = require("express");
const router = express.Router();
const { saveResult, getHistory } = require("../controllers/carbonController");
const { protect } = require("../middleware/authMiddleware");

router.post("/save", protect, saveResult);
router.get("/history", protect, getHistory);

module.exports = router;
