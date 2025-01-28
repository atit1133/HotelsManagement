const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "keep1234",
  database: "hotel_management",
  multipleStatements: true,
  connectionLimit: 10, // Set the maximum number of concurrent connections
});

// Export the pool
module.exports = pool;
