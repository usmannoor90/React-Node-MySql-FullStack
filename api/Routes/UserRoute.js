const express = require("express");
const {
  ChangePassword,
  GettUserSetting,
  CheckIn,
  CheckOut,
  StopTime,
  ResumeTime,
  GettAllUserSetting,
  UpdateSettingUser,
} = require("../controller/UserController");

const router = express.Router();

router.route("/setting").get(GettUserSetting);
router.route("/updatesettingbyuser").put(UpdateSettingUser);
router.route("/allusers").get(GettAllUserSetting);
router.route("/setting/changepassword").put(ChangePassword);
router.route("/checkin").post(CheckIn);
router.route("/stoptime").post(StopTime);
router.route("/resumetime").post(ResumeTime);
router.route("/checkout").post(CheckOut);

module.exports = router;
