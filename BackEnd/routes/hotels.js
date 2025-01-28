const express = require("express");
const router = express.Router();
const pool = require("./conn");

// Create a new hotel
router.post("/", (req, res) => {
  const { name, location, rating } = req.body;
  const query = "INSERT INTO hotels (name, location, rating) VALUES (?, ?, ?)";

  //Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).send(err);
    }
    connection.query(query, [name, location, rating], (err, result) => {
      connection.release();
      res.status(201).send("Hotel created successfully");
    });
  });
});

//Read all Hotels
router.get("/", (req, res) => {
  const query = "SELECT * FROM hotel";
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).send(err);
    }
    connection.query(query, (err, result) => {
      connection.release();
      res.status(200).json(result);
    });
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
