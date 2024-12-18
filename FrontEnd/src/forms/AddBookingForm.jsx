import React, { useState } from "react";
import axios from "axios";

const AddBookingForm = () => {
  const [booking, setBooking] = useState({
    guest_id: "",
    room_number: "",
    checkin_date: "",
    checkout_date: "",
    total_price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBooking({ ...booking, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/bookings", booking)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Booking</h3>
      <div>
        <label htmlFor="guest_id">Guest ID:</label>
        <input
          type="number"
          name="guest_id"
          placeholder="Guest ID"
          value={booking.guest_id}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="room_number">Room Number:</label>
        <input
          type="number"
          name="room_number"
          placeholder="Room Number"
          value={booking.room_number}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="checkin_date">Check-in Date:</label>
        <input
          type="date"
          name="checkin_date"
          value={booking.checkin_date}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="checkout_date">Check-out Date:</label>
        <input
          type="date"
          name="checkout_date"
          value={booking.checkout_date}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="total_price">Total Price:</label>
        <input
          type="number"
          name="total_price"
          placeholder="Total Price"
          value={booking.total_price}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Add Booking</button>
    </form>
  );
};

export default AddBookingForm;
