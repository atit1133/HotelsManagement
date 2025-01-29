const express = require("express");
const router = express.Router();
const pool = require("./conn");

// Create a new hotel
router.post("/", (req, res) => {
  // const { name, location, rating } = req.body;
  const {
    hotel_name,
    hotel_address,
    hotel_phone,
    hotel_email,
    hotel_stars,
    checkin_time,
    checkout_time,
  } = req.body;
  const query =
    "INSERT INTO hotel (hotel_name, hotel_address, hotel_phone, hotel_email, hotel_stars, checkin_time, checkout_time) VALUES (?, ?, ?, ?, ?, ?, ?)";

  //Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).send(err);
    }
    connection.query(
      query,
      [
        hotel_name,
        hotel_address,
        hotel_phone,
        hotel_email,
        hotel_stars,
        checkin_time,
        checkout_time,
      ],
      (err, result) => {
        if (err) {
          return res.status(500).send(err);
        }
        connection.release();
        res.status(201).send("Hotel created successfully");
      }
    );
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

// Update a hotel
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const {
    hotel_name,
    hotel_address,
    hotel_phone,
    hotel_email,
    hotel_stars,
    checkin_time,
    checkout_time,
  } = req.body;
  const query =
    "UPDATE hotel SET hotel_name=?, hotel_address=?, hotel_phone=?, hotel_email=?, hotel_stars=?, checkin_time=?, checkout_time=? WHERE hotel_id = ?";
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).send(err);
    }
    connection.query(
      query,
      [
        hotel_name,
        hotel_address,
        hotel_phone,
        hotel_email,
        hotel_stars,
        checkin_time,
        checkout_time,
        id,
      ],
      (err, result) => {
        if (err) {
          return res.status(500).send(err);
        }
        connection.release();
        res.status(200).send("Hotel updated successfully");
      }
    );
  });
});

// Delete a hotel
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM hotel WHERE hotel_id = ?";
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
