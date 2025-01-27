const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

// Create a connection to the database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "hotel_management",
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
});

// Create a new hotel
router.post("/", (req, res) => {
  const { name, location, rating } = req.body;
  const query = "INSERT INTO hotels (name, location, rating) VALUES (?, ?, ?)";
  db.query(query, [name, location, rating], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).send("Hotel created successfully");
  });
});

// Read all hotels
router.get("/", (req, res) => {
  const query = "SELECT * FROM hotels";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).json(results);
  });
});

// Update a hotel
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, location, rating } = req.body;
  const query =
    "UPDATE hotels SET name = ?, location = ?, rating = ? WHERE id = ?";
  db.query(query, [name, location, rating, id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send("Hotel updated successfully");
  });
});

// Delete a hotel
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM hotels WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send("Hotel deleted successfully");
  });
});

module.exports = router;
