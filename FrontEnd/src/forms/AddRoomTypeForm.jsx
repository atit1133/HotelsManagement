import { useState } from "react";
import "./AddRoomTypeForm.css";
import PropTypes from "prop-types";
// import axios from "axios";

// eslint-disable-next-line react/prop-types
const AddRoomTypeForm = ({ btnClose, currentHotel, fetchDataRoomType }) => {
  const [roomType, setRoomType] = useState({
    name: "",
    descriptions: "",
    price_per_night: "",
    capacity: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomType({ ...roomType, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentHotel === null) {
      fetchDataRoomType();
    } else {
      try {
        fetch("http://localhost:3002/api/roomtype", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(roomType),
        }).then(() => {
          console.log("New room type added");
          fetchDataRoomType();
          btnClose();
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleFormClick = (e) => {
    e.stopPropagation();
    // Stop the click event from propagating to the backdrop e.stopPropagation();
  };

  return (
    <form
      className="add-room-type-form"
      onSubmit={handleSubmit}
      onClick={handleFormClick}
    >
      <h3 className="form-title">Add New Room Type</h3>
      <input
        type="text"
        name="name"
        className="form-input"
        placeholder="Room Type Name"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="descriptions"
        className="form-input"
        placeholder="Descriptions"
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="price_per_night"
        className="form-input"
        placeholder="Price Per Night"
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="capacity"
        className="form-input"
        placeholder="Capacity"
        onChange={handleChange}
        required
      />
      <div className="form-buttons">
        <button type="submit" className="form-button">
          Add Room Type
        </button>
        <button type="button" className="btn-close" onClick={btnClose}>
          x
        </button>
      </div>
    </form>
  );
};

AddRoomTypeForm.propTypes = {
  btnClose: PropTypes.func.isRequired,
};

export default AddRoomTypeForm;
