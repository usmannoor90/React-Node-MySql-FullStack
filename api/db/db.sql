-- create user table 

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    salt VARCHAR(255),
    profile_picture BLOB,
    title VARCHAR(255),
    address VARCHAR(255),
    city VARCHAR(255),
    country VARCHAR(255),
    contact VARCHAR(20),
    dateofjoining DATE,
    previlage VARCHAR(25)
);


--  create check-In-Out table with reference to users table

CREATE TABLE checkinout (
    checkin_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    checkin_time TIMESTAMP,
    start_time TIMESTAMP,
    checkout_time TIMESTAMP,
    total_hours INT,
    break_hours INT,
    workplace VARCHAR(50),
    present TINYINT(1),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

--  create stoptimedata table for breaks with reference to checkinout table and user table.

CREATE TABLE stoptimedata (
    stop_id INT AUTO_INCREMENT PRIMARY KEY,
    checkin_id INT,
    stop_time DATETIME,
    stop_reason VARCHAR(255),
    is_resume TINYINT(1),
    resumetime TIMESTAMP,
    FOREIGN KEY (checkin_id) REFERENCES checkinout(checkin_id)
);


--  best part of the project is for every user one entry of row is added into the checkinout table with user_id and checkin_id and presenet as false everything else is null

-- Enable the Event Scheduler if it's not already enabled
SET GLOBAL event_scheduler = ON;

-- Create the event
DELIMITER //
CREATE EVENT daily_checkinout_event
ON SCHEDULE EVERY 1 DAY
STARTS TIMESTAMP(CURDATE() + INTERVAL 1 DAY)
DO
BEGIN
  INSERT INTO checkinout (user_id, checkin_time, start_time, checkout_time, total_hours, break_hours, workplace, present)
  SELECT 
    users.user_id,
    NULL AS checkin_time,
    NULL AS start_time,
    NULL AS checkout_time,
    NULL AS total_hours,
    NULL AS break_hours,
    NULL AS workplace,
    false AS present
  FROM users;
END //
DELIMITER ;
