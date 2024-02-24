//get method for getting all the departments

const { connection } = require("../db");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const fs = require("fs");
const { CustomError } = require("../middleware/errorMiddleware");
const Joi = require("joi");

const ChangePassword = async (req, res, next) => {
  try {
    const { OldPassword, NewPassword } = req.body;
    // Define a Joi schema for validation
    const schema = Joi.object({
      OldPassword: Joi.string().required(),
      NewPassword: Joi.string().required(),
    });
    // Validate the request body against the schema
    const { error } = schema.validate(req.body);

    if (error) {
      throw new CustomError(error.message, 1002, false, 400);
    }

    const token = req.headers["authorization"];

    if (!token) {
      throw new CustomError(
        "Unauthorized: Token not provided",
        1002,
        false,
        400
      );
    }

    const token1 = token.split(" ")[0];
    const decoded = jwt.verify(token1, process.env.JWT_SECRET);

    if (!decoded) {
      throw new CustomError("Unauthorized: Invalid token", 1002, false, 400);
    }
    const email = decoded.email;

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
    const passwordMatch = await bcrypt.compare(OldPassword, user.password);

    if (!passwordMatch) {
      throw new CustomError("Invalid password", 1002, false, 400);
    }
    // Now you can proceed to update the password with the new one
    const hashedNewPassword = await bcrypt.hash(NewPassword, 10);

    // Update the user's password in the database
    const updateQuery = "UPDATE users SET password=? WHERE email=?";
    await new Promise((resolve, reject) => {
      connection.query(
        updateQuery,
        [hashedNewPassword, email],
        (err, results, fields) => {
          if (err) {
            console.error(err.message);
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });

    res.status(200).json({
      data: {
        message: "Password Updated successfully",
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    const er = new CustomError(
      error.Message || "Internal Server Error",
      error.errorCode || 5003,
      error.Success || false,
      error.StatusCode || 500
    );
    next(er);
  }
};

const GettAllUser = async (req, res, next) => {
  try {
    const selectQuery = "SELECT * FROM users ";
    const existingUser = await new Promise((resolve, reject) => {
      connection.query(selectQuery, (err, results, fields) => {
        if (err) {
          console.error(err.message);
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    console.log(existingUser);
    res.status(200).json({
      data: {
        user: existingUser,
        message: "Wallet address added successfully",
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    const er = new CustomError(
      error.Message || "Internal Server Error",
      error.errorCode || 5003,
      error.Success || false,
      error.StatusCode || 500
    );
    next(er);
  }
};

const UpdateSettingUser = async (req, res, next) => {
  try {
    const { user_id, email } = req.body;

    const selectQuery = "SELECT * FROM users where user_id=? and email=? ";
    const existingUser = await new Promise((resolve, reject) => {
      connection.query(
        selectQuery,
        [user_id, email],
        (err, results, fields) => {
          if (err) {
            console.error(err.message);
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });

    console.log(existingUser);
    res.status(200).json({
      data: {
        user: existingUser,
        message: "Wallet address added successfully",
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    const er = new CustomError(
      error.Message || "Internal Server Error",
      error.errorCode || 5003,
      error.Success || false,
      error.StatusCode || 500
    );
    next(er);
  }
};

const GettUserSetting = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];

    if (!token) {
      throw new CustomError(
        "Unauthorized: Token not provided",
        1002,
        false,
        400
      );
    }

    const token1 = token.split(" ")[0];
    const decoded = jwt.verify(token1, process.env.JWT_SECRET);

    if (!decoded) {
      throw new CustomError("Unauthorized: Invalid token", 1002, false, 400);
    }
    const Email = decoded.email;

    const selectQuery = "SELECT * FROM users WHERE Email=?";
    const existingUser = await new Promise((resolve, reject) => {
      connection.query(selectQuery, [Email], (err, results, fields) => {
        if (err) {
          console.error(err.message);
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    console.log(existingUser);

    res.status(200).json({
      data: {
        user: {
          profile_picture: existingUser[0].profile_picture,
          name: existingUser[0].username,
          title: existingUser[0].intern,
          email: existingUser[0].email,
          address: existingUser[0].address,
          city: existingUser[0].city,
          country: existingUser[0].country,
          contact: existingUser[0].contact,
          dateofJoing: existingUser[0].dateofjoining,
        },
        message: "Wallet address added successfully",
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    const er = new CustomError(
      error.Message || "Internal Server Error",
      error.errorCode || 5003,
      error.Success || false,
      error.StatusCode || 500
    );
    next(er);
  }
};
const GetUserHistory = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];

    if (!token) {
      throw new CustomError(
        "Unauthorized: Token not provided",
        1002,
        false,
        400
      );
    }

    const token1 = token.split(" ")[0];
    const decoded = jwt.verify(token1, process.env.JWT_SECRET);

    if (!decoded) {
      throw new CustomError("Unauthorized: Invalid token", 1002, false, 400);
    }
    const { Email, userId } = decoded;

    // Fetch all checkinout data for the specified user
    const selectCheckinoutQuery = "SELECT * FROM checkinout WHERE user_id=?";
    const checkinoutData = await new Promise((resolve, reject) => {
      connection.query(
        selectCheckinoutQuery,
        [userId],
        (err, results, fields) => {
          if (err) {
            console.error(err.message);
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });

    res.status(200).json({
      data: checkinoutData,
    });
  } catch (error) {
    console.error("Signup error:", error);
    const er = new CustomError(
      error.Message || "Internal Server Error",
      error.errorCode || 5003,
      error.Success || false,
      error.StatusCode || 500
    );
    next(er);
  }
};

const CheckIn = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];

    if (!token) {
      throw new CustomError(
        "Unauthorized: Token not provided",
        1002,
        false,
        400
      );
    }

    const token1 = token.split(" ")[0];
    const decoded = jwt.verify(token1, process.env.JWT_SECRET);

    if (!decoded) {
      throw new CustomError("Unauthorized: Invalid token", 1002, false, 400);
    }

    const { email, userId } = decoded;
    const { workplace } = req.body;

    const existingCheckinQuery = `
      SELECT checkin_id
      FROM checkinout
      WHERE user_id = ? AND DATE(checkin_time) = CURDATE()
    `;

    const existingCheckinResult = await new Promise((resolve, reject) => {
      connection.query(
        existingCheckinQuery,
        [userId],
        (err, results, fields) => {
          if (err) {
            console.error(err.message);
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });

    if (existingCheckinResult.length > 0) {
      throw new CustomError("User already checked in today", 1005, false, 400);
    }
    const insertQuery = `
        INSERT INTO checkinout (user_id, checkin_time, start_time, workplace)
        VALUES (?, NOW(), NOW(), ?)
    `;

    const insertResult = await new Promise((resolve, reject) => {
      connection.query(
        insertQuery,
        [userId, workplace],
        (err, results, fields) => {
          if (err) {
            console.error(err.message);
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });

    // Retrieve checkin_time and start_time from the inserted record
    const insertedCheckinId = insertResult.insertId; // Assuming checkin_id is auto-incremented
    const getCheckinCheckoutQuery = `
        SELECT checkin_time, start_time
        FROM checkinout
        WHERE checkin_id = ?
    `;

    const checkinCheckoutResult = await new Promise((resolve, reject) => {
      connection.query(
        getCheckinCheckoutQuery,
        [insertedCheckinId],
        (err, results, fields) => {
          if (err) {
            console.error(err.message);
            reject(err);
          } else {
            resolve(results[0]); // Assuming only one record is retrieved
          }
        }
      );
    });

    const { checkin_time, start_time } = checkinCheckoutResult;

    // Respond with the retrieved checkin_time and start_time
    res.status(200).json({
      success: true,
      data: { checkin_time, start_time },
      message: "Check-in successful",
    });
  } catch (error) {
    console.error("Signup error:", error);
    const er = new CustomError(
      error.Message || "Internal Server Error",
      error.errorCode || 5003,
      error.Success || false,
      error.StatusCode || 500
    );
    next(er);
  }
};

const StopTime = async (req, res, next) => {
  try {
    const { stopTime, stopReason, isResume } = req.body;

    const schema = Joi.object({
      stopTime: Joi.string().required(),
      stopReason: Joi.string().required(),
      isResume: Joi.boolean().required(),
    });
    // Validate the request body against the schema
    const { error } = schema.validate(req.body);

    if (error) {
      throw new CustomError(error.message, 1002, false, 400);
    }
    // Check if it's a resume time
    if (isResume) {
      throw new CustomError(
        "Invalid operation: Cannot manually add resume time",
        1006,
        false,
        400
      );
    }

    const token = req.headers["authorization"];

    if (!token) {
      throw new CustomError(
        "Unauthorized: Token not provided",
        1002,
        false,
        400
      );
    }

    const token1 = token.split(" ")[0];
    const decoded = jwt.verify(token1, process.env.JWT_SECRET);

    if (!decoded) {
      throw new CustomError("Unauthorized: Invalid token", 1002, false, 400);
    }

    const { email, userId } = decoded;
    const checkinIdQuery = `
      SELECT checkin_id
      FROM checkinout
      WHERE user_id = ? AND checkout_time IS NULL
    `;

    const checkinIdResult = await new Promise((resolve, reject) => {
      connection.query(checkinIdQuery, [userId], (err, results, fields) => {
        if (err) {
          console.error(err.message);
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    if (checkinIdResult.length === 0) {
      throw new CustomError("No active check-in found", 1004, false, 400);
    }

    const checkinId = checkinIdResult[0].checkin_id;

    // Check if there's already a stop time with is_resume = false
    const existingStopTimeQuery = `
      SELECT 1
      FROM StopTimeData
      WHERE checkin_id = ? AND is_resume = false
    `;

    const existingStopTimeResult = await new Promise((resolve, reject) => {
      connection.query(
        existingStopTimeQuery,
        [checkinId],
        (err, results, fields) => {
          if (err) {
            console.error(err.message);
            reject(err);
          } else {
            resolve(results.length > 0);
          }
        }
      );
    });

    if (existingStopTimeResult && !isResume) {
      throw new CustomError(
        "Stop time already recorded, cannot add another",
        1007,
        false,
        400
      );
    }

    // Insert stop time into StopTimeData table
    const insertStopTimeQuery = `
      INSERT INTO stoptimedata (checkin_id, stop_time, stop_reason, is_resume)
      VALUES (?, ?, ?, ?)
    `;

    await new Promise((resolve, reject) => {
      connection.query(
        insertStopTimeQuery,
        [checkinId, stopTime, stopReason, isResume],
        (err, results, fields) => {
          if (err) {
            console.error(err.message);
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });

    res.status(200).json({ success: true, message: "Stop time recorded" });
  } catch (error) {
    console.error("Signup error:", error);
    const er = new CustomError(
      error.Message || "Internal Server Error",
      error.errorCode || 5003,
      error.Success || false,
      error.StatusCode || 500
    );
    next(er);
  }
};

const ResumeTime = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];

    if (!token) {
      throw new CustomError(
        "Unauthorized: Token not provided",
        1002,
        false,
        400
      );
    }

    const token1 = token.split(" ")[0];
    const decoded = jwt.verify(token1, process.env.JWT_SECRET);

    if (!decoded) {
      throw new CustomError("Unauthorized: Invalid token", 1002, false, 400);
    }

    const { email, userId } = decoded;
    const { stopTime } = req.body; // Assuming you have the stopTime in the request body

    // Fetch the current check-in record for the user
    const checkinQuery = `
      SELECT checkin_id, start_time
      FROM checkinout
      WHERE user_id = ? AND checkout_time IS NULL
    `;

    const checkinResult = await new Promise((resolve, reject) => {
      connection.query(checkinQuery, [userId], (err, results, fields) => {
        if (err) {
          console.error(err.message);
          reject(err);
        } else {
          resolve(results[0]);
        }
      });
    });

    if (!checkinResult) {
      throw new CustomError("No active check-in found", 1004, false, 400);
    }

    const { checkin_id, start_time } = checkinResult;

    // Calculate break_hours
    const updateQuery = `
    UPDATE checkinout
  SET start_time = NOW(),
      break_hours = TIMESTAMPDIFF(SECOND, start_time, NOW()) / 3600
  WHERE user_id = ? AND checkout_time IS NULL
    `;

    await new Promise((resolve, reject) => {
      connection.query(updateQuery, [userId], (err, results, fields) => {
        if (err) {
          console.error(err.message);
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    // Update the corresponding entry in StopTimeData for the resumed time
    const updateStopTimeQuery = `
      UPDATE StopTimeData
      SET is_resume = true
      WHERE checkin_id = ? AND stop_time = ?
    `;

    await new Promise((resolve, reject) => {
      connection.query(
        updateStopTimeQuery,
        [checkin_id, stopTime],
        (err, results, fields) => {
          if (err) {
            console.error(err.message);
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });

    res.status(200).json({ success: true, message: "Time resumed" });
  } catch (error) {
    console.error("Signup error:", error);
    const er = new CustomError(
      error.Message || "Internal Server Error",
      error.errorCode || 5003,
      error.Success || false,
      error.StatusCode || 500
    );
    next(er);
  }
};

const CheckOut = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];

    if (!token) {
      throw new CustomError(
        "Unauthorized: Token not provided",
        1002,
        false,
        400
      );
    }

    const token1 = token.split(" ")[0];
    const decoded = jwt.verify(token1, process.env.JWT_SECRET);

    if (!decoded) {
      throw new CustomError("Unauthorized: Invalid token", 1002, false, 400);
    }

    const { email, userId } = decoded;

    const updateQuery = `
       UPDATE checkinout
      SET checkout_time = NOW(),
          total_hours = IFNULL(TIMESTAMPDIFF(SECOND, start_time, NOW()) / 3600, 0)
      WHERE user_id = ? AND checkout_time IS NULL
    `;

    await new Promise((resolve, reject) => {
      connection.query(updateQuery, [userId], (err, results, fields) => {
        if (err) {
          console.error(err.message);
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    res.status(200).json({ success: true, message: "Check-out successful" });
  } catch (error) {
    console.error("Signup error:", error);
    const er = new CustomError(
      error.Message || "Internal Server Error",
      error.errorCode || 5003,
      error.Success || false,
      error.StatusCode || 500
    );
    next(er);
  }
};

module.exports = {
  ChangePassword,
  GettUserSetting,
  GetUserHistory,
  CheckIn,
  StopTime,
  ResumeTime,
  CheckOut,
  GettAllUser,
  UpdateSettingUser,
};
