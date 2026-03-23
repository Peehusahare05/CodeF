require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const slowDown = require("express-slow-down");
const connectDB = require("./config/db");
const { validateEnv } = require("./config/env");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const env = validateEnv();

const app = express();
app.disable("x-powered-by");
app.set("trust proxy", 1);

// Connect to MongoDB
connectDB();

// Middleware
app.use(helmet());
app.use(compression({ threshold: 1024 }));
app.use(cookieParser());
if (!env.isProduction) {
  app.use(morgan("dev"));
}

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (!env.isProduction) return callback(null, true);
      if (env.corsOrigins.includes(origin)) return callback(null, true);
      const corsError = new Error("CORS policy does not allow this origin.");
      corsError.statusCode = 403;
      return callback(corsError);
    },
    credentials: true,
  }),
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: false, limit: "16kb" }));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: env.isProduction ? 300 : 1000,
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: env.isProduction ? 20 : 200,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  message: {
    message: "Too many authentication attempts. Please try again later.",
  },
});

const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: env.isProduction ? 100 : 500,
  delayMs: () => 250,
});

app.use("/api", apiLimiter, speedLimiter);
app.use("/api/auth", authLimiter);

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/carbon", require("./routes/carbonRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));
app.use("/api/suggestions", require("./routes/suggestionsRoutes"));
app.use("/api/simulator", require("./routes/simulatorRoutes"));

// Health check
app.get("/", (req, res) => res.json({ message: "EcoTrack API running" }));
app.get("/health/live", (req, res) => res.status(200).json({ status: "live" }));
app.get("/health/ready", (req, res) => {
  const isDbReady = mongoose.connection.readyState === 1;
  if (!isDbReady) {
    return res
      .status(503)
      .json({ status: "not_ready", database: "disconnected" });
  }

  return res.status(200).json({ status: "ready", database: "connected" });
});

app.use(notFound);
app.use(errorHandler);

const PORT = env.port;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${env.nodeEnv} mode`);
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use.`);
  } else {
    console.error("Server startup error:", error.message);
  }
  process.exit(1);
});
