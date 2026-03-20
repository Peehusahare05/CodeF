const jwt = require("jsonwebtoken");
const User = require("../models/User");

const getTokenFromRequest = (req) => {
  if (req.cookies && req.cookies.ecotrack_token) {
    return req.cookies.ecotrack_token;
  }

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    return req.headers.authorization.split(" ")[1];
  }

  return null;
};

const attachUserFromToken = async (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return User.findById(decoded.id).select("-password");
};

const protect = async (req, res, next) => {
  const token = getTokenFromRequest(req);

  if (token) {
    try {
      req.user = await attachUserFromToken(token);
      if (!req.user) {
        return res
          .status(401)
          .json({ message: "Not authorised. User no longer exists." });
      }
      next();
    } catch (error) {
      return res
        .status(401)
        .json({ message: "Not authorised. Token invalid." });
    }
  }

  if (!token) {
    return res
      .status(401)
      .json({ message: "Not authorised. No token provided." });
  }
};

const optionalProtect = async (req, res, next) => {
  const token = getTokenFromRequest(req);

  if (!token) {
    return next();
  }

  try {
    req.user = await attachUserFromToken(token);
  } catch (_error) {
    req.user = null;
  }

  return next();
};

module.exports = { protect, optionalProtect };
