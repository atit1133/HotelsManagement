import { useEffect, useState } from "react";
import "./AddBookingForm.css";
import { CiSearch } from "react-icons/ci";
import { TbHomePlus } from "react-icons/tb";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { IoPricetagsOutline } from "react-icons/io5";
import SearchRoom from "../components/SearchRoom";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const AddBookingForm = ({ actions, sentBackData }) => {
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
  const [searchList, setSearchList] = useState();
  const [openDialogRoom, setOpenDialogRoom] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBooking({ ...booking, [name]: value });
  };

  const handleSearchType = (e) => {
    const { name, value } = e.target;
    const searchData = listGuest.filter((members) => {
      if (name === "first_name") {
        return members.first_name && members.first_name.includes(value);
      } else if (name === "phone") {
        return members.phone && members.phone.includes(value);
      } else if (name === "id_card") {
        return members.id_card && members.id_card.includes(value);
      }
    });
    setSearchList(searchData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const fetchGuest = async () => {
    const response = await fetch(`${apiUrl}/api/guest`);
    const data = await response.json();
    setListGuest(data);
    setSearchList(data);
  };

  useEffect(() => {
    fetchGuest();
  }, []);

  const handleBack = (e) => {
    e.preventDefault();
    sentBackData("Test Data");
  };

  const handleSearch = () => {
    setOpenDialog(!openDialog);
  };

  const openDialogRooms = () => {
    setOpenDialogRoom(!openDialogRoom);
    console.log(openDialogRoom);
  };

  return (
    <>
      {openDialogRoom && (
        <dialog open style={{ zIndex: "9999" }}>
          <SearchRoom />
        </dialog>
      )}
      {openDialog && (
        <dialog
          open
          style={{
            zIndex: "9999",
            height: "80vh",
            borderRadius: "10px",
          }}
        >
          <div style={{ position: "relative" }}>
            <h3>Search Data Guest</h3>
            <form action="">
              <label htmlFor="first_name">ชื่อลูกค้า</label>
              <input
                type="text"
                name="first_name"
                onChange={handleSearchType}
              />
              <label htmlFor="id_card">เลขบัตรประชาชน</label>
              <input type="number" name="id_card" onChange={handleSearchType} />
              <label htmlFor="phone">หมายเลขโทรศัพท์</label>
              <input type="number" name="phone" onChange={handleSearchType} />
            </form>
          </div>
          <div style={{ overflowY: "auto", height: "70vh" }}>
            <table className="data-table" style={{}}>
              <thead
                style={{
                  position: "sticky",
                  top: "-20px",
                  background: "white",
                  zIndex: "1",
                }}
              >
                <th>id</th>
                <th>ชื่อ</th>
                <th>นามสกุล</th>
                <th>หมายเลขโทรศัพท์</th>
                <th>เลขบัตรประชาชน</th>
              </thead>
              <tbody>
                {searchList.map((data) => (
                  <tr>
                    <td>{data.guest_id}</td>
                    <td>{data.first_name}</td>
                    <td>{data.last_name}</td>
                    <td>{data.phone}</td>
                    <td>{data.id_card}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p
              style={{
                position: "absolute",
                top: "-10px",
                right: "10px",
                cursor: "pointer",
              }}
              onClick={handleSearch}
            >
              x
            </p>
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
                    display: "flex",
                  }}
                >
                  <CiSearch
                    onClick={handleSearch}
                    style={{
                      width: "30px",
                      height: "30px",
                      cursor: "pointer",
                    }}
                  />
                  <input
                    style={{
                      marginLeft: "12px",
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
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <TbHomePlus
                    onClick={openDialogRooms}
                    style={{
                      width: "30px",
                      height: "30px",
                      cursor: "pointer",
                    }}
                  />
                  <input
                    style={{
                      marginLeft: "12px",
                    }}
                    type="number"
                    name="room_number"
                    placeholder="Room Number"
                    value={booking.room_number}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="checkin_date">Check-in Date:</label>
                <div style={{ display: "flex" }}>
                  <HiOutlineCalendarDateRange
                    style={{
                      width: "30px",
                      height: "30px",
                      cursor: "pointer",
                    }}
                  />
                  <input
                    style={{ marginLeft: "12px" }}
                    type="date"
                    name="checkin_date"
                    value={booking.checkin_date}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="checkout_date">Check-out Date:</label>
                <div style={{ display: "flex" }}>
                  <HiOutlineCalendarDateRange
                    style={{
                      width: "30px",
                      height: "30px",
                      cursor: "pointer",
                    }}
                  />
                  <input
                    style={{ marginLeft: "12px" }}
                    type="date"
                    name="checkout_date"
                    value={booking.checkout_date}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="total_price">Total Price:</label>
                <div style={{ display: "flex" }}>
                  <IoPricetagsOutline
                    style={{
                      width: "30px",
                      height: "30px",
                    }}
                  />
                  <input
                    style={{ marginLeft: "12px" }}
                    type="number"
                    name="total_price"
                    placeholder="Total Price"
                    value={booking.total_price}
                    onChange={handleChange}
                    required
                  />
                </div>
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
