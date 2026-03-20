const express = require("express");
const router = express.Router();
const { chat } = require("../controllers/aiController");
const { optionalProtect } = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");
const { aiChatSchema } = require("../validations/aiValidation");

router.post("/chat", optionalProtect, validate(aiChatSchema), chat);

module.exports = router;
