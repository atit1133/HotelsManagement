const express = require("express");
const router = express.Router();
const pool = require("./conn");

// Create a new guest
router.post("/", (req, res) => {
  const { first_name, last_name, date_of_birth, address, phone, email } =
    req.body;
  const query =
    "INSERT INTO guest (first_name,last_name, date_of_birth, address, phone, email) VALUES (?, ?, ?, ?, ?, ?)";

  //Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).send(err);
    }
    connection.query(
      query,
      [first_name, last_name, date_of_birth, address, phone, email],
      (err, result) => {
        if (err) {
          return res.status(500).send(err);
        }
        connection.release();
        res.status(201).send("guest created successfully");
      }
    );
  });
});

//Read all guest
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM guest where guest_id = ?";
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

// Update a guest
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, date_of_birth, address, phone, email } =
    req.body;
  const query =
    "UPDATE guest SET first_name=?, last_name=?, date_of_birth=?,  address=?, phone=?, email=? WHERE guest_id = ?";
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).send(err);
    }
    connection.query(
      query,
      [first_name, last_name, date_of_birth, address, phone, email, id],
      (err, result) => {
        if (err) {
          return res.status(500).send(err);
        }
        connection.release();
        res.status(200).send("guest type updated successfully");
      }
    );
  });
});

// Delete a guest
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM guest WHERE guest_id = ?";
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).send(err);
    }
    connection.query(query, [id], (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      connection.release();
      res.status(200).send("guest deleted successfully");
    });
  });
});

module.exports = router;
