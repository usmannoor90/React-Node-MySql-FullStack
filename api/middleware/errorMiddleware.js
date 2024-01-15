const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Check if the error is a known error with a custom message
  if (err.message) {
    return res.status(err.status || 500).json({ error: err.message });
  }

  // For unknown errors, send a generic message
  res.status(500).json({ error: "Internal Server Error kkk" });
};

module.exports = errorHandler;
