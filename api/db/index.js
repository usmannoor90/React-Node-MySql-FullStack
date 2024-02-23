const mysql = require("mysql");

const config = {
  host: "127.0.0.1",
  user: "root",
  password: "admin",
  database: "mysqldb",
  multipleStatements: true,
};
const poolConfig = {
  host: "127.0.0.1",
  user: "root",
  password: "admin",
  database: "mysqldb",
  connectionLimit: 15,
};

const connection = mysql.createConnection(config);

const pool = mysql.createPool(poolConfig);

connection.connect((err) => {
  if (!err) {
    console.log("hell yeah it is connected");
  }

  if (err) {
    console.log("no connection to the db successful!!", err);
  }
});

module.exports = { connection, pool };
