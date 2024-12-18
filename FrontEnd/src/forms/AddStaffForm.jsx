import React, { useState } from "react";
import axios from "axios";

const AddStaffForm = () => {
  const [staff, setStaff] = useState({
    staff_name: "",
    staff_lastname: "",
    position: "",
    salary: "",
    hotel_id: "",
    date_of_birth: "",
    phone: "",
    email: "",
    hire_date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStaff({ ...staff, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/staff", staff)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Staff</h3>
      <input
        type="text"
        name="staff_name"
        placeholder="First Name"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="staff_lastname"
        placeholder="Last Name"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="position"
        placeholder="Position"
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="salary"
        placeholder="Salary"
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="hotel_id"
        placeholder="Hotel ID"
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="date_of_birth"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />
      <input type="date" name="hire_date" onChange={handleChange} required />
      <button type="submit">Add Staff</button>
    </form>
  );
};

export default AddStaffForm;
