const express = require("express");
const router = express.Router();
const pool = require("./conn");

// Create a new payment
router.post("/", (req, res) => {
  const { booking_id, amount, payment_date, payment_method } = req.body;
  const query =
    "INSERT INTO payment ( booking_id, amount, payment_date, payment_method) VALUES (?, ?, ?, ?)";

  //Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).send(err);
    }
    connection.query(
      query,
      [booking_id, amount, payment_date, payment_method],
      (err, result) => {
        if (err) {
          return res.status(500).send(err);
        }
        connection.release();
        res.status(201).send("payment created successfully");
      }
    );
  });
});

//Read all payment
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM payment where payment_id = ?";
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

// Update a payment
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { booking_id, amount, payment_date, payment_method } = req.body;
  const query =
    "UPDATE payment SET booking_id=?, amount=?, payment_date=?, payment_method=? WHERE payment_id = ?";
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).send(err);
    }
    connection.query(
      query,
      [booking_id, amount, payment_date, payment_method, id],
      (err, result) => {
        if (err) {
          return res.status(500).send(err);
        }
        connection.release();
        res.status(200).send("payment updated successfully");
      }
    );
  });
});

// Delete a payment
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM payment WHERE payment_id = ?";
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).send(err);
    }
    connection.query(query, [id], (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      connection.release();
      res.status(200).send("payment deleted successfully");
    });
  });
});

module.exports = router;
