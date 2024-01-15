const express = require("express");
const { SingupUser, LoginUser } = require("../controller/AuthController");

const router = express.Router();

router.route("/signup").post(SingupUser);
router.route("/login").post(LoginUser);

module.exports = router;
