const express = require("express");
const router = express.Router();
const pool = require("./conn");

// Create a new room
router.post("/", (req, res) => {
  const { name, descriptions, price_per_night, capacity } = req.body;
  const query =
    "INSERT INTO room_type (name, descriptions, price_per_night, capacity) VALUES (?, ?, ?, ?)";

  //Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).send(err);
    }
    connection.query(
      query,
      [name, descriptions, price_per_night, capacity],
      (err, result) => {
        if (err) {
          return res.status(500).send(err);
        }
        connection.release();
        res.status(201).send("Room Type created successfully");
      }
    );
  });
});

//Read all room Type by id hotel
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM room_type where hotel_id = ?";
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).send(err);
    }
    connection.query(query, [id], (err, result) => {
      if (result.length === 0) {
        return res.status(404).send("The data table is empty.");
      }
      connection.release();
      res.status(200).json(result);
    });
  });
});

// Update a room type
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, descriptions, price_per_night, capacity } = req.body;
  const query =
    "UPDATE room_type SET name=?, descriptions=?, price_per_night=?, capacity=? WHERE room_id = ?";
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).send(err);
    }
    connection.query(
      query,
      [name, descriptions, price_per_night, capacity, id],
      (err, result) => {
        if (err) {
          return res.status(500).send(err);
        }
        connection.release();
        res.status(200).send("Room type updated successfully");
      }
    );
  });
});

// Delete a room type
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM room_type WHERE type_id = ?";
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).send(err);
    }
    connection.query(query, [id], (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      connection.release();
      res.status(200).send("Hotel deleted successfully");
    });
  });
});

module.exports = router;
