import { useEffect, useState } from "react";
import "./AddBookingForm.css"; // Import the CSS file
import { CiSearch } from "react-icons/ci";
const apiUrl = import.meta.env.VITE_API_BASE_URL;

const AddBookingForm = ({ actions, sentBackData }) => {
  // actions = !actions;

  const bookingInitailState = {
    guest_id: "",
    room_number: "",
    checkin_date: "",
    checkout_date: "",
    total_price: "",
  };
  const [booking, setBooking] = useState(bookingInitailState);
  const [listGuest, setListGuest] = useState();
  const [openDialog, setOpenDialog] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBooking({ ...booking, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const fetchGuest = async () => {
    const response = await fetch(`${apiUrl}/api/guest`);
    const data = await response.json();
    setListGuest(data);
  };

  useEffect(() => {
    fetchGuest();
  }, []);

  const handleBack = (e) => {
    e.preventDefault();
    sentBackData("Test Data");
  };

  const handleSearch = () => {
    setOpenDialog(true);
  };

  return (
    <>
      {openDialog && (
        <dialog open style={{ zIndex: "9999" }}>
          <div>
            <h3>Search Data Guest</h3>
            <form action="">
              <label htmlFor="name">ชื่อลูกค้า</label>
              <input type="text" name="name" />
              <label htmlFor="idCard">เลขบัตรประชาชน</label>
              <input type="number" name="idCard" />
              <label htmlFor="phoneNumber">หมายเลขโทรศัพท์</label>
              <input type="number" name="phoneNumber" />
              <button type="submit">Search</button>
            </form>
          </div>
          <div>
            <table className="data-table">
              <thead>
                <th>id</th>
                <th>ชื่อ</th>
                <th>นามสกุล</th>
                <th>หมายเลขโทรศัพท์</th>
                <th>เลขบัตรประชาชน</th>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                </tr>
              </tbody>
            </table>
          </div>
        </dialog>
      )}
      {actions ? (
        <div id="addBookingForm">
          <div style={{ width: "97%" }}>
            <form onSubmit={handleSubmit} className="booking-form">
              <h3 className="form-heading">Add New Booking</h3>
              <div className="form-group">
                <label htmlFor="guest_id">Guest ID:</label>
                <div
                  style={{
                    position: "relative",
                    height: "30px",
                    marginTop: "10px",
                  }}
                >
                  <CiSearch
                    onClick={handleSearch}
                    style={{
                      width: "30px",
                      height: "30px",
                      position: "absolute",
                      top: "0px",
                      left: "0px",
                      cursor: "pointer",
                    }}
                  />
                  <input
                    style={{
                      position: "absolute",
                      top: "0px",
                      left: "40px", // Adjust the left position to avoid overlap
                    }}
                    type="number"
                    name="guest_id"
                    placeholder="Guest ID"
                    value={booking.guest_id}
                    onChange={handleChange}
                    required
                  />
                </div>
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
        </div>
      ) : (
        " "
      )}
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
          <tr onClick={handleBack}>
            <td>1</td>
            <td>101</td>
            <td>2021-08-01</td>
            <td>2021-08-05</td>
            <td>5000</td>
            {actions == "booking" ? (
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            ) : (
              <td>
                <select name="status" id="" defaultValue="">
                  <option value="" disabled>
                    Select a status
                  </option>
                  <option value="checkin">Check-in</option>
                  <option value="checkin">Check-out</option>
                  <option value="checkin">Confirmed</option>
                </select>
              </td>
            )}
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default AddBookingForm;
