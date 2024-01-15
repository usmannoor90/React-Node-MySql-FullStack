const express = require("express");
const {
  Getalleployees,
  Addeployees,
  Updateeployees,
  Deleteeployees,
  SaveEployee,
} = require("../controller/EmployeeController");

const router = express.Router();

router.route("/all").get(Getalleployees);
router.route("/add").post(Addeployees);
router.route("/update").put(Updateeployees);
router.route("/profiledata").post(SaveEployee);
router.route("/:id").delete(Deleteeployees);

module.exports = router;
