const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Token not provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden: Invalid token" });
    }

    req.user = decoded;
    next();
  });
}

module.exports = authenticateToken;
