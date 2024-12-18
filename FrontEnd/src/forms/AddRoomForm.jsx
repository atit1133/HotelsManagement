import React, { useState } from "react";
import axios from "axios";

const AddRoomForm = () => {
  const [room, setRoom] = useState({
    hotel_id: "",
    type_id: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoom({ ...room, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/rooms", room)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Room</h3>
      <input
        type="number"
        name="hotel_id"
        placeholder="Hotel ID"
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="type_id"
        placeholder="Room Type ID"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="status"
        placeholder="Status"
        onChange={handleChange}
        required
      />
      <button type="submit">Add Room</button>
    </form>
  );
};

export default AddRoomForm;
