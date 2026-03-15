const express = require("express");
const router = express.Router();
const { chat } = require("../controllers/aiController");
const validate = require("../middleware/validate");
const { aiChatSchema } = require("../validations/aiValidation");

router.post("/chat", validate(aiChatSchema), chat);

module.exports = router;

