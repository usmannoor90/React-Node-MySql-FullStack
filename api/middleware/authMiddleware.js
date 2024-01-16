const jwt = require("jsonwebtoken");
require("dotenv").config();

function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];

  console.log(token);

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Token not provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    console.log("Error during token verification:", err);
    console.log("Decoded user information:", decoded);
    if (err !== null) {
      return res.status(403).json({ error: "Forbidden: Invalid token" });
    }

    req.user = decoded;
  });
  next();
}

module.exports = authenticateToken;
