const express = require("express");
const { LoginUser } = require("../controller/AuthController");

const router = express.Router();

router.route("/login").post(LoginUser);

module.exports = router;
