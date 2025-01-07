import { useState } from "react";
import PropTypes from "prop-types";
// import axios from "axios";
import "./AddRoomForm.css";

const AddRoomForm = ({ btnClose }) => {
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
    // axios
    //   .post("http://localhost:3001/rooms", room)
    //   .then((response) => console.log(response))
    //   .catch((error) => console.log(error));
  };

  const handleFormClick = (e) => {
    e.stopPropagation();
    // Stop the click event from propagating to the backdrop e.stopPropagation();
  };

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
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="type_id"
          className="form-input"
          placeholder="Room Type ID"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="status"
          className="form-input"
          placeholder="Status"
          onChange={handleChange}
          required
        />
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
          <tr>
            <td>1</td> <td>Deluxe</td> <td>Useable</td> <td>Modify / Delete</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

AddRoomForm.propTypes = {
  btnClose: PropTypes.func.isRequired,
};

export default AddRoomForm;
