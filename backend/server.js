require("dotenv").config();
const express = require("express");
const cors = require("cors");
const net = require("net");
const connectDB = require("./config/db");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/carbon", require("./routes/carbonRoutes"));

// Health check
app.get("/", (req, res) => res.json({ message: "EcoTrack API running ✅" }));

// ── Auto-detect a free port starting from preferred ──────────────────────────
function getFreePort(startPort) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.listen(startPort, () => {
      const { port } = server.address();
      server.close(() => resolve(port));
    });
    server.on("error", () => resolve(getFreePort(startPort + 1)));
  });
}

const PREFERRED_PORT = parseInt(process.env.PORT) || 5001;

getFreePort(PREFERRED_PORT).then((PORT) => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`   (Update vite.config.js proxy target if port changed)`);
  });
});
