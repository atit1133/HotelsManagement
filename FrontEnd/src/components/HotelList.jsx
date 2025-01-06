import "./HotelList.css";

const HotelList = () => {
  const hotels = [
    {
      id: 1,
      name: "Hotel California",
      address: "424 E. Palm Canyon Dr, Los Angeles, CA",
      phone: "123-456-7890",
      email: "contact@hotelcalifornia.com",
      stars: 5,
      checkin: "3:00 PM",
      checkout: "11:00 AM",
    },
    {
      id: 2,
      name: "The Grand Budapest Hotel",
      address: "Alpenstrasse 10, Zubrowka",
      phone: "987-654-3210",
      email: "info@grandbudapest.com",
      stars: 4,
      checkin: "2:00 PM",
      checkout: "10:00 AM",
    },
    {
      id: 3,
      name: "The Overlook Hotel",
      address: "Sidewinder, Colorado",
      phone: "555-123-4567",
      email: "reservation@overlookhotel.com",
      stars: 5,
      checkin: "4:00 PM",
      checkout: "12:00 PM",
    },
  ];

  const handleAddHotel = () => {
    // Logic to add a new hotel
    console.log("Add new hotel");
  };

  return (
    <div className="hotel-list-container">
      <h1 className="title">Hotel List</h1>
      <button className="add-hotel-button" onClick={handleAddHotel}>
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
            <th>Stars</th>
            <th>Checkin</th>
            <th>Checkout</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {hotels.map((hotel) => (
            <tr key={hotel.id}>
              <td>{hotel.id}</td>
              <td>{hotel.name}</td>
              <td>{hotel.address}</td>
              <td>{hotel.phone}</td>
              <td>{hotel.email}</td>
              <td>{hotel.stars}</td>
              <td>{hotel.checkin}</td>
              <td>{hotel.checkout}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HotelList;
