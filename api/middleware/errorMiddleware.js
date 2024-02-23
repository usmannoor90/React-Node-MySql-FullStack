class CustomError extends Error {
  constructor(Message, errorCode, Success, StatusCode) {
    super();
    this.Message = Message;
    this.errorCode = errorCode;
    this.Success = Success;
    this.StatusCode = StatusCode;
  }
}

const ErrorHandler = (err, req, res, next) => {
  // console.log(err);

  const errStatus = err.StatusCode || 500;
  const errMsg = err.Message || "Something went wrong";
  res.status(errStatus).json({
    data: {
      IsSuccessfull: err.Success,
      Errorcode: err.errorCode,
      Message: errMsg,
      stack: process.env.NODE_ENV === "development" ? err.stack : {},
    },
  });
  // next();
};

module.exports = { ErrorHandler, CustomError };
