const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

// @route  POST /api/auth/register
// @access Public
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields." });
    }

    const normalizedEmail = String(email).toLowerCase().trim();

    // Check if user exists
    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) {
      return res
        .status(409)
        .json({ message: "An account with this email already exists." });
    }

    // Create user (password hashed by pre-save hook)
    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password,
    });
    const token = generateToken(user._id);

    res.cookie("ecotrack_token", token, cookieOptions);

    res.status(201).json({
      message: "Account created successfully.",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

// @route  POST /api/auth/login
// @access Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please enter email and password." });
    }

    // Find user
    const normalizedEmail = String(email).toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = generateToken(user._id);
    res.cookie("ecotrack_token", token, cookieOptions);

    res.status(200).json({
      message: "Login successful.",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

// @route  GET /api/auth/me
// @access Private
const getMe = async (req, res) => {
  res.status(200).json({ user: req.user });
};

// @route  POST /api/auth/logout
// @access Private
const logout = async (req, res) => {
  res.clearCookie("ecotrack_token", cookieOptions);
  res.status(200).json({ message: "Logged out successfully." });
};

// @route  PUT /api/auth/profile
// @access Private
const updateProfile = async (req, res) => {
  try {
    const { name, email, currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (name) user.name = name.trim();
    if (email) user.email = email.toLowerCase().trim();

    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({
          message: "Current password is required to set a new password.",
        });
      }
      const isMatch = await user.matchPassword(currentPassword);
      if (!isMatch) {
        return res
          .status(401)
          .json({ message: "Current password is incorrect." });
      }
      if (newPassword.length < 8) {
        return res
          .status(400)
          .json({ message: "New password must be at least 8 characters." });
      }
      user.password = newPassword;
    }

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully.",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Update profile error:", error);
    if (error.code === 11000) {
      return res
        .status(409)
        .json({ message: "Email already in use by another account." });
    }
    res
      .status(500)
      .json({ message: "Server error. Could not update profile." });
  }
};

module.exports = { register, login, getMe, updateProfile, logout };
