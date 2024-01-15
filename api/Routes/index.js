const express = require("express");
const router = express.Router();

const DepartmentRoute = require("./DepartmentRoute");
const EmployeeRoute = require("./EmployeeRoute");
const AuthRoute = require("./AuthRoute");

router.use("/department", DepartmentRoute);
router.use("/employee", EmployeeRoute);
router.use("/userauth", AuthRoute);

module.exports = router;
