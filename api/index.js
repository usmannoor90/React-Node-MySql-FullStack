const express = require("express");
const router = require("./Routes");
const bodyParser = require("body-parser");
const cors = require("cors");
const Fileupload = require("express-fileupload");
require("dotenv").config();

const app = express();
app.use(Fileupload());
app.use("/pics", express.static(__dirname + "/api/pics"));
app.use(cors());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", router);

const Port = process.env.PORT || 3030;
app.listen(Port, () => {
  console.log("listening to the port " + Port);
  // connection;
});
