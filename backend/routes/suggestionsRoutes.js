const express = require("express");
const router = express.Router();
const { generateSuggestions } = require("../controllers/suggestionsController");
const { protect } = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");
const {
  suggestionGenerateSchema,
} = require("../validations/suggestionsValidation");

router.post(
  "/generate",
  protect,
  validate(suggestionGenerateSchema),
  generateSuggestions,
);

module.exports = router;
