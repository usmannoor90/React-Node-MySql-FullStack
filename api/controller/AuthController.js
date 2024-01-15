//get method for getting all the departments
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connection = require("../db/index");

const SingupUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Generate a salt
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password with the salt
    const hashedPassword = await bcrypt.hash(password, salt);
    // Save the user to the database (assuming you have a 'users' table)
    const insertQuery =
      "INSERT INTO users (username, email, password, salt) VALUES (?, ?, ?, ?)";
    const result = await connection.query(insertQuery, [
      username,
      email,
      hashedPassword,
      salt,
    ]);

    // Generate a JWT token for the new user
    const token = jwt.sign(
      { userId: result.insertId, username, email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//add a department
const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists in the database
    const selectQuery = "SELECT * FROM users where email=?";

    const queryResult = await connection.query(selectQuery, [email]);

    if (!queryResult.values || queryResult.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    console.log(queryResult.values[0]);

    res.status(200).json({ id: "message" });

    // const user = queryResult[0];

    // const hashedPassword = await bcrypt.hash(password, user.salt);
    // const passwordMatch = await bcrypt.compare(hashedPassword, user.password);
    // if (!passwordMatch) {
    //   return res.status(401).json({ error: "Invalid credentials" });
    // }

    // // Generate a JWT token for the logged-in user
    // const token = jwt.sign(
    //   { userId: user[0].id, username: user[0].username, email },
    //   `${process.env.JWT_SECRET}`,
    //   { expiresIn: "1h" }
    // );

    // res.status(200).json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal Server Error " });
  }
};

module.exports = {
  SingupUser,
  LoginUser,
};
