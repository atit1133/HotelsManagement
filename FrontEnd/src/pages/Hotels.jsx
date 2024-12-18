import React, { useState } from "react";

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [newHotel, setNewHotel] = useState({ name: "", location: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHotel({ ...newHotel, [name]: value });
  };

  const handleAddHotel = (e) => {
    e.preventDefault();
    setHotels([...hotels, { ...newHotel, rooms: [] }]);
    setNewHotel({ name: "", location: "" });
  };

  return (
    <div>
      <h2>Register New Hotel</h2>
      <form onSubmit={handleAddHotel}>
        <input
          type="text"
          name="name"
          placeholder="Hotel Name"
          value={newHotel.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={newHotel.location}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Add Hotel</button>
      </form>
      {/* Display hotels */}
      <HotelList hotels={hotels} setHotels={setHotels} />
    </div>
  );
};

const HotelList = ({ hotels, setHotels }) => {
  return (
    <div>
      <h2>Hotels</h2>
      {hotels.map((hotel, index) => (
        <HotelItem key={index} hotel={hotel} setHotels={setHotels} />
      ))}
    </div>
  );
};

const HotelItem = ({ hotel, setHotels }) => {
  const [newRoom, setNewRoom] = useState({ type: "", capacity: "" });

  const handleRoomInputChange = (e) => {
    const { name, value } = e.target;
    setNewRoom({ ...newRoom, [name]: value });
  };

  const handleAddRoom = (hotelName) => {
    setHotels((prevHotels) =>
      prevHotels.map((hotel) =>
        hotel.name === hotelName
          ? { ...hotel, rooms: [...hotel.rooms, newRoom] }
          : hotel
      )
    );
    setNewRoom({ type: "", capacity: "" });
  };

  return (
    <div>
      <h3>{hotel.name}</h3>
      <p>{hotel.location}</p>
      <h4>Add Room</h4>
      <input
        type="text"
        name="type"
        placeholder="Room Type"
        value={newRoom.type}
        onChange={handleRoomInputChange}
        required
      />
      <input
        type="number"
        name="capacity"
        placeholder="Capacity"
        value={newRoom.capacity}
        onChange={handleRoomInputChange}
        required
      />
      <button onClick={() => handleAddRoom(hotel.name)}>Add Room</button>

      <h4>Rooms</h4>
      <ul>
        {hotel.rooms.map((room, index) => (
          <li key={index}>
            {room.type} - Capacity: {room.capacity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Hotels;
