const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");

// Create a connection to the database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysqldocker",
  multipleStatements: true, // Enable multiple statements to execute the SQL script
});

const sqlFilePath = path.join(__dirname, "../../hotel.management.sql");

const initializeDatabase = async () => {
  try {
    const sql = fs.readFileSync(sqlFilePath, "utf8");
    console.log("SQL file read successfully.");

    db.connect((err) => {
      if (err) {
        console.error("Error connecting to the MySQL server:", err.message);
        return;
      }
      console.log("Connected to the MySQL server.");

      // Execute the SQL file
      db.query(sql, (err, results) => {
        if (err) {
          console.error("Error executing SQL file:", err.message);
          return;
        }
        console.log("Database initialized successfully.");
      });

      // Close the connection
      db.end();
    });
  } catch (err) {
    console.error("Error initializing the database:", err.message);
  }
};

// Run the initialization function
initializeDatabase();
