const express = require("express");
const router = express.Router();

const AuthRoute = require("./AuthRoute");
const UserRoute = require("./UserRoute");

router.use("/userauth", AuthRoute);
router.use("/user", UserRoute);

module.exports = router;
