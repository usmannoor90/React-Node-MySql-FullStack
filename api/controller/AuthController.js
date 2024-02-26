//get method for getting all the departments
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { connection } = require("../db/index");
const { CustomError } = require("../middleware/errorMiddleware");
const Joi = require("joi");
require("dotenv").config();

const multer = require("multer");

// Configure multer storage
const storage = multer.memoryStorage(); // Use memory storage to handle binary data
const upload = multer({ storage: storage });

const SingupUser = async (req, res, next) => {
  try {
    const {
      username,
      email,
      password,
      title,
      address,
      city,
      country,
      contact,
      dateofjoining,
      previlage,
    } = req.body;

    // Validate the request body against the schema
    const schema = Joi.object({
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      title: Joi.any(),
      address: Joi.any(),
      city: Joi.any(),
      country: Joi.any(),
      contact: Joi.any(),
      previlage: Joi.any(),

      dateofjoining: Joi.date().allow(null),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      throw new CustomError(error.message, 1002, false, 400);
    }

    const emailExistsQuery = "SELECT * FROM users WHERE email=?";
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

    if (existingUser.length > 0) {
      throw new CustomError("Email already exists", 1001, false, 400);
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const insertQuery = `
      INSERT INTO users 
      (username, email, password, salt, profile_picture, title, address, city, country, contact, dateofjoining,previlage) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
    `;

    const result = await connection.query(insertQuery, [
      username,
      email,
      hashedPassword,
      salt,
      req.file ? req.file.buffer : null, // Use req.file.buffer to access the binary data from multer
      title,
      address,
      city,
      country,
      contact,
      dateofjoining,
      previlage,
    ]);

    res.status(200).json({
      data: {
        Message: "Employee added successfully!!!",
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
    const selectUserQuery = "SELECT * FROM users WHERE email=?";
    const existingUser = await new Promise((resolve, reject) => {
      connection.query(selectUserQuery, [email], (err, results, fields) => {
        if (err) {
          console.error(err.message);
          reject(err);
        } else {
          resolve(results[0]);
        }
      });
    });

    if (existingUser.length === 0) {
      throw new CustomError("Email does not exist", 1001, false, 400);
    }

    const user = existingUser;

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new CustomError("Invalid password", 1002, false, 400);
    }

    const currentDate = new Date().toISOString(); // Get the current date
    const selectCheckinoutQuery =
      "SELECT * FROM checkinout WHERE user_id=? AND DATE(checkin_time) = CURDATE()";

    const checkinoutData = await new Promise((resolve, reject) => {
      connection.query(
        selectCheckinoutQuery,
        [user.user_id],
        (err, results, fields) => {
          if (err) {
            console.error(err.message);
            reject(err);
          } else {
            resolve(results[0]);
          }
        }
      );
    });

    // Generate a JWT token for the logged-in user
    const token = jwt.sign(
      { userId: user.user_id, email, previlage: user.previlage },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      data: {
        token: token,
        Email: user.email,
        username: user.username,
        previlage: user.previlage,

        break_hours: checkinoutData?.break_hours
          ? checkinoutData?.break_hours
          : null,
        checkin_id: checkinoutData?.checkin_id
          ? checkinoutData?.checkin_id
          : null,
        checkin_time: checkinoutData?.checkin_time
          ? checkinoutData?.checkin_time
          : null,
        checkout_time: checkinoutData?.checkout_time
          ? checkinoutData?.checkout_time
          : null,
        present: checkinoutData?.present ? checkinoutData?.present : null,
        start_time: checkinoutData?.start_time
          ? checkinoutData?.start_time
          : null,
        total_hours: checkinoutData?.total_hours
          ? checkinoutData?.total_hours
          : null,
        user_id: checkinoutData?.user_id ? checkinoutData?.user_id : null,
        workplace: checkinoutData?.workplace ? checkinoutData?.workplace : null,
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

module.exports = {
  SingupUser,
  LoginUser,
};
