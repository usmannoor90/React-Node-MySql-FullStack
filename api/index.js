const express = require("express");
const router = require("./Routes");
const bodyParser = require("body-parser");
const cors = require("cors");
const Fileupload = require("express-fileupload");
const errorHandler = require("./middleware/errorMiddleware"); // Import the error middleware
const authenticateToken = require("./middleware/authMiddleware"); // Import the error middleware
require("dotenv").config();

const app = express();
app.use(Fileupload());
app.use("/pics", express.static(__dirname + "/api/pics"));
app.use(cors());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(errorHandler);
app.use("/api/department", authenticateToken);
app.use("/api/employee", authenticateToken);

app.use("/api", router);

const Port = process.env.PORT || 3030;
app.listen(Port, () => {
  console.log("listening to the port " + Port);
  // connection;
});
