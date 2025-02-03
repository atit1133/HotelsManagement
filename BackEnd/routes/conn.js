const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "mysqldocker",
  database: "hotel_management",
  port: 3306,
  multipleStatements: true,
  connectionLimit: 10, // Set the maximum number of concurrent connections
});

// Export the pool
module.exports = pool;
