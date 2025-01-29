const express = require("express");
const router = express.Router();
const pool = require("./conn");

// Create a new room
router.post("/", (req, res) => {
  const { hotel_id, type_id, status } = req.body;
  const query = "INSERT INTO room (hotel_id, type_id, status) VALUES (?, ?, ?)";

  //Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).send(err);
    }
    connection.query(query, [hotel_id, type_id, status], (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      connection.release();
      res.status(201).send("Room created successfully");
    });
  });
});

//Read all room by id hotel
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM room where hotel_id = ?";
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

// Update a room
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const query = "UPDATE room SET status=? WHERE room_id = ?";
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).send(err);
    }
    connection.query(query, [status, id], (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      connection.release();
      res.status(200).send("Room updated successfully");
    });
  });
});

// Delete a hotel
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM hotel WHERE room_id = ?";
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
