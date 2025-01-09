/* eslint-disable react/prop-types */
import { useState } from "react";
import "./AddHotelForm.css";
// import axios from "axios";

const AddHotelForm = ({ btnClose }) => {
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
    // axios
    //   .post("http://localhost:3001/hotels", hotel)
    //   .then((response) => console.log(response))
    //   .catch((error) => console.log(error));
  };

  const handleFormClick = (e) => {
    e.stopPropagation();
    // Stop the click event from propagating to the backdrop e.stopPropagation();
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
      <input
        type="time"
        name="checkin_time"
        onChange={handleChange}
        required
        className="input-field"
      />
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
