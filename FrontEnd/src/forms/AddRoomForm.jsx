import { useEffect, useState } from "react";
import PropTypes from "prop-types";
// import axios from "axios";
import "./AddRoomForm.css";

// eslint-disable-next-line react/prop-types
const AddRoomForm = ({ btnClose, currentHotel }) => {
  const [room, setRoom] = useState({
    hotel_id: "",
    type_id: "",
    status: "",
  });
  const [dataRoomType, setDataRoomType] = useState(null);
  const [dataRoom, setDataRoom] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoom({ ...room, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateRoom = { ...room, hotel_id: currentHotel };

    try {
      await fetch("http://localhost:3002/api/rooms/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateRoom),
      }).then(() => {
        console.log("Your data collect :", updateRoom);
        console.log("New room added");
        fetchDataRoom(currentHotel);
      });
    } catch (error) {
      console.log(error);
    }
    btnClose();
  };

  const handleFormClick = (e) => {
    e.stopPropagation();
  };

  const fetchDataRoomType = async () => {
    const url = `http://localhost:3002/api/roomtype/all`;
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
  const fetchDataRoom = async () => {
    const url = `http://localhost:3002/api/rooms/${currentHotel}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setDataRoom(data);
      return data;
    } catch (error) {
      return setDataRoom({ error: error.message });
    }
  };

  useEffect(() => {
    fetchDataRoomType();
    fetchDataRoom();
  }, []);

  return (
    <div className="add-room-container">
      <form
        className="add-room-form"
        onSubmit={handleSubmit}
        onClick={handleFormClick}
      >
        <h3 className="form-title">Add New Room</h3>
        <input
          type="number"
          name="hotel_id"
          className="form-input"
          placeholder="Hotel ID"
          defaultValue={currentHotel}
          readOnly
          required
        />
        <input
          type="text"
          name="room_no"
          className="form-input"
          placeholder="Room Number"
          onChange={handleChange}
          required
        />
        <select
          name="type_id"
          className="form-input"
          onChange={handleChange}
          value={room.type_id}
          required
        >
          <option value="" disabled>
            Select Room Type
          </option>
          {dataRoomType &&
            dataRoomType.map((roomType) => (
              <option key={roomType.id} value={roomType.type_id} required>
                {roomType.name}
              </option>
            ))}
        </select>
        <select
          name="status"
          className="form-input"
          onChange={handleChange}
          value={room.status}
          defaultValue={"Select Status"}
          required
        >
          <option value="" disabled>
            Select Status
          </option>
          <option value="active">active</option>
          <option value="inactive">inactive</option>
        </select>
        <button type="submit" className="form-button">
          Add Room
        </button>
        <button className="btn-close" onClick={btnClose}>
          x
        </button>
      </form>
      <table className="data-table">
        <thead>
          <tr>
            <th>Room No.</th> <th>Room Type</th> <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dataRoom !== null &&
            dataRoom.length > 0 &&
            dataRoom.map((roomData, index) => (
              <tr key={index}>
                <td>{roomData.room_no}</td>
                <td>{roomData.room_type}</td>
                <td>{roomData.status}</td>
                <td>Delete</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

AddRoomForm.propTypes = {
  btnClose: PropTypes.func.isRequired,
};

export default AddRoomForm;
