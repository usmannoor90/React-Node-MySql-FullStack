//get method for getting all the departments

const connection = require("../db");
const fs = require("fs");

const Getalleployees = async (req, res) => {
  connection.query(`SELECT * from employee`, (err, rows, fields) => {
    if (err) {
      res.status("failed");
    }
    res.send(rows);
  });
};

//add a eployee
const Addeployees = async (req, res) => {
  const query = `INSERT into employee
  (EmployeeName, Departmeent, DateOfJoining)
  VALUES (?,?,?)`;

  const values = [
    req.body.employeeName,
    req.body.departmeent,
    req.body.dateOfJoining,
  ];

  connection.query(query, values, (err, rows, fields) => {
    if (err) console.log(err);
    res.json("added successfully");
  });
};

const Updateeployees = async (req, res) => {
  const query = `UPDATE employee set employeeName=? where employeeId=?`;

  const values = [req.body.eployeeName, req.body.eployeeId];
  connection.query(query, values, (err, rows, fields) => {
    if (err) console.log(err.message);
    res.json("Updated successfully");
  });
};

const Deleteeployees = async (req, res) => {
  const query = `DELETE from employee where employeeId=?`;

  const id = req.params.id;

  const values = [parseInt(id)];

  connection.query(query, values, (err, rows, fields) => {
    if (err) console.log(err);
    res.json("Deleted successfully");
  });
};

const SaveEployee = async (req, res) => {
  fs.writeFile("./pics/" + req.files.file.name, req.files.file.data, (err) => {
    if (err) {
      return console.log(err);
    }
    res.json(req.files.file.name);
  });
};

module.exports = {
  Getalleployees,
  Addeployees,
  Updateeployees,
  Deleteeployees,
  SaveEployee,
};
