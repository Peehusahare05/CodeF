const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  if (req.cookies && req.cookies.ecotrack_token) {
    token = req.cookies.ecotrack_token;
  }

  if (
    !token &&
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
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

module.exports = { protect };
