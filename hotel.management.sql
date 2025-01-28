-- Create the hotel table
CREATE TABLE IF NOT EXISTS `hotel_management`.`hotel` (
    `hotel_id` INT NOT NULL AUTO_INCREMENT,
    `hotel_name` VARCHAR(255) NOT NULL,
    `hotel_address` VARCHAR(255) NOT NULL,
    `hotel_phone` VARCHAR(15) NOT NULL,
    `hotel_email` VARCHAR(255) NOT NULL,
    `hotel_stars` INT NOT NULL,
    `checkin_time` TIME NOT NULL,
    `checkout_time` TIME NULL,
    PRIMARY KEY (`hotel_id`)
) ENGINE = InnoDB;

-- Create the staff table
CREATE TABLE IF NOT EXISTS `hotel_management`.`staff` (
    `staff_id` INT NOT NULL AUTO_INCREMENT,
    `staff_name` VARCHAR(255) NOT NULL,
    `staff_lastname` VARCHAR(255) NOT NULL,
    `position` VARCHAR(255) NOT NULL,
    `salary` DECIMAL(10, 2) NOT NULL,
    `hotel_id` INT NOT NULL,
    `date_of_birth` DATE NOT NULL,
    `phone` VARCHAR(15) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `hire_date` DATE NOT NULL,
    PRIMARY KEY (`staff_id`),
    FOREIGN KEY (`hotel_id`) REFERENCES `hotel`(`hotel_id`)
) ENGINE = InnoDB;

-- Create the room table
CREATE TABLE IF NOT EXISTS `hotel_management`.`room` (
    `room_id` INT NOT NULL AUTO_INCREMENT,
    `hotel_id` INT NOT NULL,
    `type_id` INT NOT NULL,
    `status` VARCHAR(20) NOT NULL,
    PRIMARY KEY (`room_id`),
    FOREIGN KEY (`hotel_id`) REFERENCES `hotel`(`hotel_id`)
) ENGINE = InnoDB;

-- Create the room_type table
CREATE TABLE IF NOT EXISTS `hotel_management`.`room_type` (
    `type_id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `descriptions` VARCHAR(255) NOT NULL,
    `price_per_night` DECIMAL(10, 2) NOT NULL,
    `capacity` INT NOT NULL,
    PRIMARY KEY (`type_id`)
) ENGINE = InnoDB;

-- Create the guest table
CREATE TABLE IF NOT EXISTS `hotel_management`.`guest` (
    `guest_id` INT NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(50) NOT NULL,
    `last_name` VARCHAR(50) NOT NULL,
    `date_of_birth` DATE NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(15) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`guest_id`)
) ENGINE = InnoDB;

-- Create the booking table
CREATE TABLE IF NOT EXISTS `hotel_management`.`booking` (
    `booking_id` INT NOT NULL AUTO_INCREMENT,
    `guest_id` INT NOT NULL,
    `room_number` INT NOT NULL,
    `checkin_date` DATE NOT NULL,
    `checkout_date` DATE NOT NULL,
    `total_price` DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (`booking_id`),
    FOREIGN KEY (`guest_id`) REFERENCES `guest`(`guest_id`),
    FOREIGN KEY (`room_number`) REFERENCES `room`(`room_id`)
) ENGINE = InnoDB;

-- Create the payment table
CREATE TABLE IF NOT EXISTS `hotel_management`.`payment` (
    `payment_id` INT NOT NULL AUTO_INCREMENT,
    `booking_id` INT NOT NULL,
    `amount` DECIMAL(10, 2) NOT NULL,
    `payment_date` DATE NOT NULL,
    `payment_method` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`payment_id`),
    FOREIGN KEY (`booking_id`) REFERENCES `booking`(`booking_id`)
) ENGINE = InnoDB;

-- Create the user_activity table
-- Create the users table
CREATE TABLE IF NOT EXISTS `hotel_management`.`users` (
    `user_id` INT NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(50) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `role` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`user_id`)
) ENGINE = InnoDB;

-- Create the user_activity table
CREATE TABLE IF NOT EXISTS `hotel_management`.`user_activity` (
    `activity_id` INT NOT NULL AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `activity_type` VARCHAR(50) NOT NULL,
    `activity_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`activity_id`),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`)
) ENGINE = InnoDB;


-- Create the system_metrics table
CREATE TABLE IF NOT EXISTS `hotel_management`.`system_metrics` (
    `metric_id` INT NOT NULL AUTO_INCREMENT,
    `metric_name` VARCHAR(50) NOT NULL,
    `metric_value` DECIMAL(10, 2) NOT NULL,
    `recorded_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`metric_id`)
) ENGINE = InnoDB;

-- Create the error_logs table
CREATE TABLE IF NOT EXISTS `hotel_management`.`error_logs` (
    `error_id` INT NOT NULL AUTO_INCREMENT,
    `error_message` TEXT NOT NULL,
    `error_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`error_id`)
) ENGINE = InnoDB;

-- Create the sales_data table
CREATE TABLE IF NOT EXISTS `hotel_management`.`sales_data` (
    `sale_id` INT NOT NULL AUTO_INCREMENT,
    `room_id` INT NOT NULL,
    `quantity` INT NOT NULL,
    `total_price` DECIMAL(10, 2) NOT NULL,
    `sale_date` DATE NOT NULL,
    PRIMARY KEY (`sale_id`),
    FOREIGN KEY (`room_id`) REFERENCES `room`(`room_id`)
) ENGINE = InnoDB;
