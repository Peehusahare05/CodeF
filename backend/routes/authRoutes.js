const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getMe,
  updateProfile,
  logout,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");
const {
  registerSchema,
  loginSchema,
  updateProfileSchema,
} = require("../validations/authValidation");

// Public routes
router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

// Protected routes
router.get("/me", protect, getMe);
router.put("/profile", protect, validate(updateProfileSchema), updateProfile);
router.post("/logout", protect, logout);

module.exports = router;
