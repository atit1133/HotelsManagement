const express = require("express");
const router = express.Router();
const pool = require("./conn");

// Create a new staff
router.post("/", (req, res) => {
  const {
    staff_name,
    staff_lastname,
    position,
    salary,
    hotel_id,
    date_of_birth,
    phone,
    email,
    hire_date,
  } = req.body;
  const query =
    "INSERT INTO staff ( staff_name, staff_lastname, position, salary, hotel_id, date_of_birth, phone, email, hire_date) VALUES (?, ?, ?, ?,?, ?, ?, ?, ?)";

  //Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).send(err);
    }
    connection.query(
      query,
      [
        staff_name,
        staff_lastname,
        position,
        salary,
        hotel_id,
        date_of_birth,
        phone,
        email,
        hire_date,
      ],
      (err, result) => {
        if (err) {
          return res.status(500).send(err);
        }
        connection.release();
        res.status(201).send("staff created successfully");
      }
    );
  });
});

//Read all staff
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM staff where staff_id = ?";
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

// Update a staff
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const {
    staff_name,
    staff_lastname,
    position,
    salary,
    hotel_id,
    date_of_birth,
    phone,
    email,
    hire_date,
  } = req.body;
  const query =
    "UPDATE staff SET staff_name=?, staff_lastname=?, position=?, salary=?, hotel_id=?, date_of_birth=?, phone=?, email=?, hire_date=? WHERE staff_id = ?";
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).send(err);
    }
    connection.query(
      query,
      [
        staff_name,
        staff_lastname,
        position,
        salary,
        hotel_id,
        date_of_birth,
        phone,
        email,
        hire_date,
        id,
      ],
      (err, result) => {
        if (err) {
          return res.status(500).send(err);
        }
        connection.release();
        res.status(200).send("staff updated successfully");
      }
    );
  });
});

// Delete a staff
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM staff WHERE staff_id = ?";
  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).send(err);
    }
    connection.query(query, [id], (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      connection.release();
      res.status(200).send("staff deleted successfully");
    });
  });
});

module.exports = router;
