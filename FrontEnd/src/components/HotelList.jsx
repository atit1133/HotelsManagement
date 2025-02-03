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
  const [dataHotel, setDataHotel] = useState(null);
  const [currentHotel, setCurrentHotel] = useState(null);
  const [dataRoomType, setDataRoomType] = useState(null);
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

  const fetchDataRoomType = async (id) => {
    const url = `http://localhost:3002/api/roomtype/${id}`;
    console.log(url);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setDataRoomType(data);
      return data;
    } catch (error) {
      return setDataRoomType({ error: error.message });
    }
  };

  useEffect(() => {
    fetchDataHotel();
  }, []);

  const refreshHotelData = () => {
    fetchDataHotel();
  };

  const hotels = dataHotel;
  const handleCloseDialog = (dialogName) => {
    setShowDialog((prevState) => ({ ...prevState, [dialogName]: false }));
  };

  const handleAddHotel = (dialogName) => {
    setShowDialog((prevState) => ({ ...prevState, [dialogName]: true }));
  };

  const handleClickTable = (id) => {
    fetchDataRoomType(id);
    setCurrentHotel(id);
    console.log(currentHotel);
  };

  const handleClickEdit = (id) => {
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
      <table className="hotel-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Email</th>
            <th style={{ width: "2px" }}>Stars</th>
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
                    {isEditing ? (
                      <button>Save</button>
                    ) : (
                      <button onClick={() => handleClickEdit(hotel.hotel_id)}>
                        Edit
                      </button>
                    )}
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
          style={
            currentHotel == null
              ? { cursor: "not-allowed", marginLeft: "6px" }
              : { marginLeft: "6px" }
          }
          disabled={currentHotel == null}
        >
          Add Room Types
        </button>
        {showDialog.hotel && (
          <div
            className="dialog-backdrop"
            onClick={() => handleCloseDialog("hotel")}
          >
            <dialog open className="full-page-dialog">
              <AddHotelForm
                btnClose={() => handleCloseDialog("hotel")}
                onSubmitSuccess={refreshHotelData}
              />
            </dialog>
          </div>
        )}
        {showDialog.room && (
          <div
            className="dialog-backdrop"
            onClick={() => handleCloseDialog("room")}
          >
            <dialog open className="full-page-dialog">
              <AddRoomForm
                btnClose={() => handleCloseDialog("room")}
                currentHotel={currentHotel}
              />
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
                currentHotel={currentHotel}
                fetchDataRoomType={fetchDataRoomType}
              />
            </dialog>
          </div>
        )}
        <table className="rooms-table">
          <thead>
            <tr>
              <th>Type Room</th>
              <th>Descriptions</th>
              <th>Capacity</th>
              <th>Price Per Night</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dataRoomType !== null &&
              currentHotel !== null &&
              dataRoomType.length > 0 &&
              dataRoomType.map((room, index) => (
                <tr key={index}>
                  <td>{room.name}</td>
                  <td>{room.descriptions}</td>
                  <td>{room.capacity}</td>
                  <td>{room.price_per_night}</td>
                  <td>
                    <button>Delete</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HotelList;
