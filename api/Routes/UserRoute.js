const express = require("express");
const {
  ChangePassword,
  GettUserSetting,
  CheckIn,
  CheckOut,
  StopTime,
  ResumeTime,
  UpdateSettingUser,
  GettAllUser,
  GetUserHistory,
} = require("../controller/UserController");
const { SingupUser } = require("../controller/AuthController");

const router = express.Router();

router.route("/admin/allusers").get(GettAllUser);
router.route("/admin/adduser").post(SingupUser);

router.route("/setting").get(GettUserSetting);
router.route("/userhistory").get(GetUserHistory);
router.route("/updatesettingbyuser").put(UpdateSettingUser);
router.route("/setting/changepassword").put(ChangePassword);
router.route("/checkin").post(CheckIn);
router.route("/stoptime").post(StopTime);
router.route("/resumetime").post(ResumeTime);
router.route("/checkout").post(CheckOut);

module.exports = router;
