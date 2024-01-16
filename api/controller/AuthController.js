//get method for getting all the departments
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connection = require("../db/index");

const SingupUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const emailExistsQuery = "SELECT * FROM users where email=?";
    // Use async/await with a Promise to wait for the query to complete
    const existingUser = await new Promise((resolve, reject) => {
      connection.query(emailExistsQuery, [email], (err, results, fields) => {
        if (err) {
          console.error(err.message);
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    console.log(existingUser);

    if (existingUser.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }
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

    // // Generate a JWT token for the new user
    // const token = jwt.sign(
    //   { userId: result.insertId, username, email },
    //   process.env.JWT_SECRET,
    //   { expiresIn: "1h" }
    // );

    res.status(200).json("please check your email");
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists in the database
    const selectQuery = "SELECT * FROM users where email=?";

    const existingUser = await new Promise((resolve, reject) => {
      connection.query(selectQuery, [email], (err, results, fields) => {
        if (err) {
          console.error(err.message);
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    if (existingUser.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = existingUser[0];

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate a JWT token for the logged-in user
    const token = jwt.sign({ userId: user.id, email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  SingupUser,
  LoginUser,
};
