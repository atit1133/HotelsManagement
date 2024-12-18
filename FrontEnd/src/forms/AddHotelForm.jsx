import React, { useState } from "react";
import axios from "axios";

const AddHotelForm = () => {
  const [hotel, setHotel] = useState({
    hotel_name: "",
    hotel_address: "",
    hotel_phone: "",
    hotel_email: "",
    hotel_stars: "",
    checkin_time: "",
    checkout_time: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotel({ ...hotel, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/hotels", hotel)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Hotel</h3>
      <input
        type="text"
        name="hotel_name"
        placeholder="Hotel Name"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="hotel_address"
        placeholder="Hotel Address"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="hotel_phone"
        placeholder="Hotel Phone"
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="hotel_email"
        placeholder="Hotel Email"
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="hotel_stars"
        placeholder="Hotel Stars"
        onChange={handleChange}
        required
      />
      <input type="time" name="checkin_time" onChange={handleChange} required />
      <input type="time" name="checkout_time" onChange={handleChange} />
      <button type="submit">Add Hotel</button>
    </form>
  );
};

export default AddHotelForm;
