import { useState } from "react";
import "./AddBookingForm.css"; // Import the CSS file

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
    // axios
    //   .post("http://localhost:3001/bookings", booking)
    //   .then((response) => console.log(response))
    //   .catch((error) => console.log(error));
  };

  return (
    <>
      <div style={{ width: "97%" }}>
        <form onSubmit={handleSubmit} className="booking-form">
          <h3 className="form-heading">Add New Booking</h3>
          <div className="form-group">
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
          <div className="form-group">
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
          <div className="form-group">
            <label htmlFor="checkin_date">Check-in Date:</label>
            <input
              type="date"
              name="checkin_date"
              value={booking.checkin_date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="checkout_date">Check-out Date:</label>
            <input
              type="date"
              name="checkout_date"
              value={booking.checkout_date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
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
          <button
            type="submit"
            className="submit-button"
            style={{ alignSelf: "start" }}
          >
            Add Booking
          </button>
        </form>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>Guest ID</th>
            <th>Room Number</th>
            <th>Check-in Date</th>
            <th>Check-out Date</th>
            <th>Total Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>101</td>
            <td>2021-08-01</td>
            <td>2021-08-05</td>
            <td>5000</td>
            <td>
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default AddBookingForm;
