const express = require("express");
const {
  GetallDepartments,
  AddDepartments,
  UpdateDepartments,
  DeleteDepartments,
} = require("../controller/DepartmentController");

const router = express.Router();

router.route("/all").get(GetallDepartments);
router.route("/add").post(AddDepartments);
router.route("/update").put(UpdateDepartments);
router.route("/:id").delete(DeleteDepartments);

module.exports = router;
