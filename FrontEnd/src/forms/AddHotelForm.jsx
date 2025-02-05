/* eslint-disable react/prop-types */
import { useState } from "react";
import "./AddHotelForm.css";
// import axios from "axios";
const apiUrl = import.meta.env.VITE_API_BASE_URL;

const AddHotelForm = ({ btnClose, onSubmitSuccess }) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/api/hotels`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(hotel),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      btnClose();
      onSubmitSuccess();
    } catch (error) {
      console.log("Error saving data", error);
    }
  };

  const handleFormClick = (e) => {
    e.stopPropagation();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="form-container"
      onClick={handleFormClick}
    >
      <h3>Add New Hotel</h3>
      <input
        type="text"
        name="hotel_name"
        placeholder="Hotel Name"
        onChange={handleChange}
        required
        className="input-field"
      />
      <input
        type="text"
        name="hotel_address"
        placeholder="Hotel Address"
        onChange={handleChange}
        required
        className="input-field"
      />
      <input
        type="text"
        name="hotel_phone"
        placeholder="Hotel Phone"
        onChange={handleChange}
        required
        className="input-field"
      />
      <input
        type="email"
        name="hotel_email"
        placeholder="Hotel Email"
        onChange={handleChange}
        required
        className="input-field"
      />
      <input
        type="number"
        name="hotel_stars"
        placeholder="Hotel Stars"
        onChange={handleChange}
        required
        className="input-field"
      />
      <label htmlFor="checkout_time">Checkin -Time-</label>
      <input
        type="time"
        name="checkin_time"
        onChange={handleChange}
        required
        className="input-field"
      />
      <label htmlFor="checkout_time">Checkout -Time-</label>
      <input
        type="time"
        name="checkout_time"
        onChange={handleChange}
        className="input-field"
      />
      <button type="submit" className="submit-button">
        Add Hotel
      </button>
      <button className="close-dialog" type="button" onClick={btnClose}>
        x
      </button>
    </form>
  );
};

export default AddHotelForm;
