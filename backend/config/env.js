const required = ["MONGO_URI", "JWT_SECRET"];

function parseOrigins(value) {
  if (!value) return [];
  return value
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function validateEnv() {
  const missing = required.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`,
    );
  }

  const nodeEnv = process.env.NODE_ENV || "development";
  const port = Number.parseInt(process.env.PORT || "5000", 10);
  const corsOrigins = parseOrigins(process.env.CORS_ORIGINS);

  if (Number.isNaN(port) || port <= 0) {
    throw new Error("PORT must be a valid positive number.");
  }

  if (nodeEnv === "production" && process.env.JWT_SECRET.length < 32) {
    throw new Error("JWT_SECRET must be at least 32 characters in production.");
  }

  if (nodeEnv === "production" && corsOrigins.length === 0) {
    throw new Error(
      "CORS_ORIGINS is required in production and must include allowed frontend origins.",
    );
  }

  return {
    nodeEnv,
    port,
    isProduction: nodeEnv === "production",
    corsOrigins,
  };
}

module.exports = { validateEnv };
