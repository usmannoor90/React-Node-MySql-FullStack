const express = require("express");
const router = express.Router();

const DepartmentRoute = require("./DepartmentRoute");
const EmployeeRoute = require("./EmployeeRoute");
const AuthRoute = require("./AuthRoute");
const UserRoute = require("./UserRoute");

router.use("/userauth", AuthRoute);
router.use("/user", UserRoute);
router.use("/department", DepartmentRoute);
router.use("/employee", EmployeeRoute);

module.exports = router;
