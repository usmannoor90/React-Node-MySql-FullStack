const express = require("express");
const router = require("./Routes");
const bodyParser = require("body-parser");
const cors = require("cors");
const Fileupload = require("express-fileupload");
const { ErrorHandler, CustomError } = require("./middleware/errorMiddleware"); // Import the error middleware

const authenticateToken = require("./middleware/authMiddleware"); // Import the error middleware
require("dotenv").config();

const app = express();
app.use(Fileupload());
app.use("/pics", express.static(__dirname + "/api/pics"));
app.use(cors());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/user", authenticateToken);

app.use("/api", router);

app.all("*", (req, res, next) => {
  const er = new CustomError(
    `can't find ${req.originalUrl} on the server`,
    4001,
    false,
    404
  );

  next(er);
});
// last middleware to use
app.use(ErrorHandler);

const Port = process.env.PORT || 3030;
app.listen(Port, () => {
  console.log("listening to the port " + Port);
  // connection;
});
