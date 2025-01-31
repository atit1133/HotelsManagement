import "./HotelList.css";
import AddHotelForm from "../forms/AddHotelForm";
import AddRoomForm from "../forms/AddRoomForm";
import AddRoomTypeForm from "../forms/AddRoomTypeForm";
import { useEffect, useState } from "react";

const HotelList = () => {
  const [showDialog, setShowDialog] = useState({
    hotel: false,
    room: false,
    roomType: false,
  });
  const [expandedHotelId, setExpandedHotelId] = useState(null);
  const [dataHotel, setDataHotel] = useState(null);
  const fetchDataHotel = async () => {
    try {
      const response = await fetch("http://localhost:3002/api/hotels");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setDataHotel(data);
      return data;
    } catch (error) {
      return setDataHotel({ error: error.message });
    }
  };

  useEffect(() => {
    fetchDataHotel();
  }, []);

  // const hotels = [
  //   {
  //     id: 1,
  //     name: "Hotel California",
  //     address: "424 E. Palm Canyon Dr, Los Angeles, CA",
  //     phone: "123-456-7890",
  //     email: "contact@hotelcalifornia.com",
  //     stars: 5,
  //     checkin: "3:00 PM",
  //     checkout: "11:00 AM",
  //     rooms: [
  //       { name: "Deluxe", typeId: 101, capacity: 2, price: 150 },
  //       { name: "Suite", typeId: 102, capacity: 4, price: 300 },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     name: "The Grand Budapest Hotel",
  //     address: "Alpenstrasse 10, Zubrowka",
  //     phone: "987-654-3210",
  //     email: "info@grandbudapest.com",
  //     stars: 4,
  //     checkin: "2:00 PM",
  //     checkout: "10:00 AM",
  //     rooms: [
  //       { name: "Standard", typeId: 201, capacity: 2, price: 100 },
  //       { name: "Luxury Suite", typeId: 202, capacity: 5, price: 400 },
  //     ],
  //   },
  //   {
  //     id: 3,
  //     name: "The Overlook Hotel",
  //     address: "Sidewinder, Colorado",
  //     phone: "555-123-4567",
  //     email: "reservation@overlookhotel.com",
  //     stars: 5,
  //     checkin: "4:00 PM",
  //     checkout: "12:00 PM",
  //     rooms: [
  //       { name: "King Room", typeId: 301, capacity: 2, price: 200 },
  //       { name: "Presidential Suite", typeId: 302, capacity: 6, price: 500 },
  //     ],
  //   },
  // ];

  const hotels = dataHotel;
  console.log(hotels);
  const handleCloseDialog = (dialogName) => {
    setShowDialog((prevState) => ({ ...prevState, [dialogName]: false }));
  };

  const handleAddHotel = (dialogName) => {
    setShowDialog((prevState) => ({ ...prevState, [dialogName]: true }));
  };

  const handleClickTable = (id) => {
    setDataEditID(id);
  };

  const [dataEditID, setDataEditID] = useState(null);

  return (
    <div className="hotel-list-container">
      <h1 className="title roboto-regular">Hotel List</h1>
      <button
        className="add-hotel-button"
        onClick={() => handleAddHotel("hotel")}
      >
        Register New Hotel
      </button>
      {showDialog.hotel && (
        <div
          className="dialog-backdrop"
          onClick={() => handleCloseDialog("hotel")}
        >
          <dialog open className="full-page-dialog">
            <AddHotelForm btnClose={() => handleCloseDialog("hotel")} />
          </dialog>
        </div>
      )}
      <table className="hotel-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Stars</th>
            <th>Checkin</th>
            <th>Checkout</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(hotels) && hotels.length > 0 ? (
            hotels.map((hotel) => {
              const isEditing = dataEditID === hotel.hotel_id;
              return (
                <tr
                  key={hotel.hotel_id}
                  onClick={() => handleClickTable(hotel.hotel_id)}
                >
                  <td>
                    {isEditing ? (
                      <input value={hotel.hotel_id} readOnly />
                    ) : (
                      hotel.hotel_id
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <input defaultValue={hotel.hotel_name} />
                    ) : (
                      hotel.hotel_name
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <input defaultValue={hotel.hotel_address} />
                    ) : (
                      hotel.hotel_address
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <input defaultValue={hotel.hotel_phone} />
                    ) : (
                      hotel.hotel_phone
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <input defaultValue={hotel.hotel_email} />
                    ) : (
                      hotel.hotel_email
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <input defaultValue={hotel.hotel_stars} />
                    ) : (
                      hotel.hotel_stars
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <input defaultValue={hotel.checkin_time} />
                    ) : (
                      hotel.checkin_time
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <input defaultValue={hotel.checkout_time} />
                    ) : (
                      hotel.checkout_time
                    )}
                  </td>
                  <td>
                    <button>Edit</button>
                    <button>Delete</button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="9" style={{ textAlign: "center" }}>
                No hotels available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {expandedHotelId !== null &&
        hotels.find((hotel) => hotel.id === expandedHotelId) && (
          <div className="hotel-rooms">
            <h2>Rooms Inventory</h2>
            <button
              className="add-hotel-button"
              onClick={() => handleAddHotel("room")}
            >
              Add Room Details
            </button>
            <button
              onClick={() => handleAddHotel("roomType")}
              className="add-hotel-button"
              style={{ marginLeft: "6px" }}
            >
              Add Room Types
            </button>
            {showDialog.room && (
              <div
                className="dialog-backdrop"
                onClick={() => handleCloseDialog("room")}
              >
                <dialog open className="full-page-dialog">
                  <AddRoomForm btnClose={() => handleCloseDialog("room")} />
                </dialog>
              </div>
            )}
            {showDialog.roomType && (
              <div
                className="dialog-backdrop"
                onClick={() => handleCloseDialog("roomType")}
              >
                <dialog open className="full-page-dialog">
                  <AddRoomTypeForm
                    btnClose={() => handleCloseDialog("roomType")}
                  />
                </dialog>
              </div>
            )}
            <table className="rooms-table">
              <thead>
                <tr>
                  <th>Room Name</th>
                  <th>Type ID</th>
                  <th>Capacity</th>
                  <th>Price Per Night</th>
                </tr>
              </thead>
              <tbody>
                {hotels
                  .find((hotel) => hotel.id === expandedHotelId)
                  .rooms.map((room, index) => (
                    <tr key={index}>
                      <td>{room.name}</td>
                      <td>{room.typeId}</td>
                      <td>{room.capacity}</td>
                      <td>{room.price}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
    </div>
  );
};

export default HotelList;
