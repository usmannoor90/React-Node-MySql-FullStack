const jwt = require("jsonwebtoken");
const { CustomError } = require("./errorMiddleware");
require("dotenv").config();

function authenticateToken(req, res, next) {
  try {
    const token = req.headers["authorization"];

    // console.log(token);

    if (!token) {
      throw new CustomError(
        "Unauthorized: Token not provided",
        4001,
        false,
        401
      );
    }

    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      console.log("Error during token verification:", err);
      console.log("Decoded user information:", decoded);
      if (err !== null) {
        throw new CustomError("Forbidden: Invalid token", 4003, false, 401);
      }

      req.user = decoded;
    });
    next();
  } catch (error) {
    const er = new CustomError(
      error.Message || "Internal Server Error",
      error.errorCode || 5002,
      error.Success || false,
      error.StatusCode || 500
    );
    next(er);
  }
}

module.exports = authenticateToken;
