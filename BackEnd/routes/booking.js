const express = require("express");
const router = express.Router();
const pool = require("./conn");

// Create a new booking
router.post("/", (req, res) => {
  const { guest_id, room_number, checkin_date, checkout_date, total_price } =
    req.body;
  const query =
    "INSERT INTO booking (guest_id, room_number, checkin_date, checkout_date, total_price) VALUES (?, ?, ?, ?, ?)";

  //Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).send(err);
    }
    connection.query(
      query,
      [guest_id, room_number, checkin_date, checkout_date, total_price],
      (err, result) => {
        if (err) {
          return res.status(500).send(err);
        }
        connection.release();
        res.status(201).send("Booking created successfully");
      }
    );
  });
});

//Read all booking
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM booking where booking_id = ?";
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

// Update a booking
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { guest_id, room_number, checkin_date, checkout_date, total_price } =
    req.body;
  const query =
    "UPDATE booking SET guest_id=?, room_number=?, checkin_dat?, checkout_date=?, total_price=? WHERE booking_id = ?";
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).send(err);
    }
    connection.query(
      query,
      [guest_id, room_number, checkin_date, checkout_date, total_price, id],
      (err, result) => {
        if (err) {
          return res.status(500).send(err);
        }
        connection.release();
        res.status(200).send("Booking type updated successfully");
      }
    );
  });
});

// Delete a booking
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM booking WHERE booking_id = ?";
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).send(err);
    }
    connection.query(query, [id], (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      connection.release();
      res.status(200).send("Booking deleted successfully");
    });
  });
});

module.exports = router;
