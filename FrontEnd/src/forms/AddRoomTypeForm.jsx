import React, { useState } from "react";
import axios from "axios";

const AddRoomTypeForm = () => {
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
    axios
      .post("http://localhost:3001/room_types", roomType)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Room Type</h3>
      <input
        type="text"
        name="name"
        placeholder="Room Type Name"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="descriptions"
        placeholder="Descriptions"
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="price_per_night"
        placeholder="Price Per Night"
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="capacity"
        placeholder="Capacity"
        onChange={handleChange}
        required
      />
      <button type="submit">Add Room Type</button>
    </form>
  );
};

export default AddRoomTypeForm;
