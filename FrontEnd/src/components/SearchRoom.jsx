import { useEffect, useState } from "react";
const apiUrl = import.meta.env.VITE_API_BASE_URL;
import { IoAdd } from "react-icons/io5";

const SearchRoom = ({ handleForm }) => {
  const [listHotels, setListHotels] = useState();
  const [listRoomType, setListRoomType] = useState();

  //Searching Hotel_name by default
  const fetchHotels = async () => {
    const response = await fetch(`${apiUrl}/api/hotels`);
    const data = await response.json();
    setListHotels(data);
  };

  //Searching Avialable Room by hotel id
  const searchRoomType = async (id) => {
    console.log(id);
    const response = await fetch(`${apiUrl}/api/rooms/${id}`);
    const data = await response.json();
    setListRoomType(data);
    console.log(listRoomType);
  };
  useEffect(() => {
    fetchHotels();
    searchRoomType("1");
    // handleForm("test Room Reservation", 100);
  }, []);

  return (
    <div>
      <form>
        <label htmlFor="hotels">เลือกโรงแรม Booking</label>
        <select
          name="hotels"
          id=""
          onChange={(e) => {
            const id = e.target.value;
            searchRoomType(id);
          }}
        >
          <option value="" disabled>
            เลือก
          </option>
          {listHotels &&
            listHotels.map((res) => (
              <option key={res.hotel_id} value={res.hotel_id}>
                {res.hotel_name}
              </option>
            ))}
        </select>
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
          {listRoomType &&
            listRoomType.map((data) => (
              <tr key={data.room_no}>
                <td>{data.room_no}</td>
                <td>{data.capacity}</td>
                <td>{data.price_per_night}</td>
                <td
                  style={{
                    textAlign: "center",
                  }}
                >
                  {
                    <IoAdd
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        handleForm(data.room_no, data.price_per_night, null)
                      }
                    />
                  }
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
export default SearchRoom;
