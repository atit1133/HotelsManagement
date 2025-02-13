import React, { useEffect, useState } from "react";
const apiUrl = import.meta.env.VITE_API_BASE_URL;

const SearchRoom = () => {
  const [listHotels, setListHotels] = useState();
  const [listRoomType, setListRoomType] = useState();

  const fetchHotels = async () => {
    const response = await fetch(`${apiUrl}/api/hotels`);
    const data = await response.json();
    setListHotels(data);
    console.log(data);
  };

  const searchRoomType = async (id) => {
    const response = await fetch(`${apiUrl}/api/roomtype/${id}`);
    const data = await response.json();
    setListRoomType(data);
    console.log(data);
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleClickRoom = () => {
    const { hotel_id } = listHotels;
    console.log(hotel_id);
    searchRoomType(listHotels.hotel_id);
  };

  const handleSelectHotel = (e) => {
    setListRoomType((prev) => [...prev, { idhotel: e.target.value }]);
  };
  return (
    <div>
      <form>
        <label htmlFor="hotels">เลือกโรงแรม Booking</label>
        <select name="hotels" id="" onClick={handleSelectHotel}>
          <option value="">เลือก</option>

          {listHotels &&
            listHotels.map((res) => (
              <option value={res.hotel_id}>{res.hotel_name}</option>
            ))}
        </select>
        <label htmlFor="roomType">เลือกห้องพักและราคา</label>
        <select name="roomType" id="" onClick={handleClickRoom}>
          <option value="">เลือก</option>
          {listRoomType &&
            listRoomType.map((res) => (
              <option value={res.hotel_id}>{res.hotel_name}</option>
            ))}
        </select>

        <button>ค้นหา</button>
      </form>
      <hr />
      <table className="data-table">
        <thead>
          <tr>
            <th>Room No.</th>
            <th>Capacity</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>350</td>
            <td>select</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SearchRoom;
