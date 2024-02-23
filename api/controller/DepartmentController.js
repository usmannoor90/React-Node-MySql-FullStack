//get method for getting all the departments

const { connection } = require("../db");

const GetallDepartments = async (req, res) => {
  connection.query(`SELECT * from Department`, (err, rows, fields) => {
    if (err) {
      res.status("failed");
    }
    res.send(rows);
  });
};

//add a department
const AddDepartments = async (req, res) => {
  const query = `INSERT into Department
  (DepartmentName)
  VALUES (?)`;

  const values = [req.body.DepartmentName];

  connection.query(query, values, (err, rows, fields) => {
    if (err) console.log(err.message);
    res.json("added successfully");
  });
};

const UpdateDepartments = async (req, res) => {
  const query = `UPDATE Department set DepartmentName=? where DepartmentId=?`;

  const values = [req.body.DepartmentName, req.body.DepartmentId];

  connection.query(query, values, (err, rows, fields) => {
    if (err) console.log(err.message);
    res.json("Updated successfully");
  });
};

const DeleteDepartments = async (req, res) => {
  const query = `DELETE from Department where DepartmentId=?`;

  const id = req.params.id;

  const values = [parseInt(id)];

  connection.query(query, values, (err, rows, fields) => {
    if (err) console.log(err.message);
    res.json("Deleted successfully");
  });
};

module.exports = {
  GetallDepartments,
  AddDepartments,
  UpdateDepartments,
  DeleteDepartments,
};
