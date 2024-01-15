const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "admin",
  database: "mysqldb",
  multipleStatements: true,
});

connection.connect((err) => {
  if (!err) {
    console.log("hell yeah it is connected");
  }

  if (err) {
    console.log("no connection to the db successful!!", err);
  }
});

module.exports = connection;
