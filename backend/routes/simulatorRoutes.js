const express = require("express");
const router = express.Router();
const { calculateSimulation } = require("../controllers/simulatorController");
const { protect } = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");
const {
  simulationCalculateSchema,
} = require("../validations/simulatorValidation");

router.post(
  "/calculate",
  protect,
  validate(simulationCalculateSchema),
  calculateSimulation,
);

module.exports = router;
