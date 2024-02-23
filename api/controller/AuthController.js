//get method for getting all the departments
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { connection } = require("../db/index");
const { CustomError } = require("../middleware/errorMiddleware");
const Joi = require("joi");
require("dotenv").config();

const SingupUser = async (req, res, next) => {
  try {
    const { username, email, password, profile_picture } = req.body;
    // Define a Joi schema for validation
    const schema = Joi.object({
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      profile_picture: Joi.any(),
    });
    // Validate the request body against the schema
    const { error } = schema.validate(req.body);
    if (error) {
      throw new CustomError(error.message, 1002, false, 400);
    }

    const emailExistsQuery = "SELECT * FROM users where email=?";
    // Use async/await with a Promise to wait for the query to complete
    const existingUser = await new Promise((resolve, reject) => {
      connection.query(emailExistsQuery, [email], (err, results, fields) => {
        if (err) {
          console.error(err.message);
          reject(err);
          // reject(new CustomError(err.sqlMessage, err.errno, false, 400));
        } else {
          resolve(results);
        }
      });
    });

    // console.log(existingUser);

    if (existingUser.length > 0) {
      throw new CustomError("Email already exists", 1001, false, 400);
    }
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password with the salt
    const hashedPassword = await bcrypt.hash(password, salt);
    // Save the user to the database (assuming you have a 'users' table)
    const insertQuery =
      "INSERT INTO users (username, email, password, salt, profile_picture) VALUES (?, ?, ?, ?,?)";
    const result = await connection.query(insertQuery, [
      username,
      email,
      hashedPassword,
      salt,
      profile_picture,
    ]);

    // Generate a JWT token for the new user
    const token = jwt.sign(
      { userId: result.user_id, username, email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      data: {
        Message: "Please Check your Email for Verfication",
        token: token,
      },
    });
  } catch (error) {
    // console.error("Signup error:", error);
    const er = new CustomError(
      error.Message || "Internal Server Error",
      error.errorCode || 5001,
      error.Success || false,
      error.StatusCode || 500
    );
    next(er);
  }
};

const LoginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Define a Joi schema for validation
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    // Validate the request body against the schema
    const { error } = schema.validate(req.body);
    if (error) {
      throw new CustomError(error.message, 1002, false, 400);
    }

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
      throw new CustomError("Email does not exist", 1001, false, 400);
    }

    const user = existingUser[0];

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new CustomError("Invalid password", 1002, false, 400);
    }

    // Generate a JWT token for the logged-in user
    const token = jwt.sign(
      { userId: user.user_id, email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      data: { token: token, Email: user.email, username: user.username },
    });
  } catch (error) {
    // console.error("Signup error:", error);
    const er = new CustomError(
      error.Message || "Internal Server Error",
      error.errorCode || 5001,
      error.Success || false,
      error.StatusCode || 500
    );
    next(er);
  }
};

module.exports = {
  SingupUser,
  LoginUser,
};
