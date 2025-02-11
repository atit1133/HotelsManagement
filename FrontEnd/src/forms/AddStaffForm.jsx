import { useEffect, useState, useCallback } from "react";
import "./AddStaffForm.css";
import FormatDate from "../components/FormatDate";
const apiUrl = import.meta.env.VITE_API_BASE_URL;

const AddStaffForm = () => {
  const [listHotel, setListHotel] = useState([]);
  const [listStaff, setListStaff] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [staff, setStaff] = useState({
    staff_name: "",
    staff_lastname: "",
    position: "",
    salary: "",
    hotel_id: "",
    date_of_birth: "",
    phone: "",
    email: "",
    hire_date: "",
  });

  const fetchHotel = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/hotels`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setListHotel(data);
    } catch (error) {
      return setListHotel({ error: error.message });
    }
  };
  const fetchStaff = useCallback(
    async (id) => {
      const indicator = id ? id : "";
      if (!indicator) {
        return [];
      }

      try {
        const response = await fetch(`${apiUrl}/api/staff/${indicator}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.length === 0) {
          setListStaff([]);
          console.log("No staff data found.");
          return [];
        }

        setListStaff(data);
        console.log("Staff data:", data);
        return data;
      } catch (error) {
        console.error("Error fetching staff data:", error);
        setListStaff({ error: error.message });
        return { error: error.message };
      }
    },
    [apiUrl]
  );

  const fetchStaffByHotel = async () => {
    try {
      const formatDate = (date) => {
        const d = new Date(date);
        const month = `${d.getMonth() + 1}`.padStart(2, "0");
        const day = `${d.getDate()}`.padStart(2, "0");
        const year = d.getFullYear();
        return [year, month, day].join("-");
      };
      const response = await fetch(`${apiUrl}/api/staff`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...staff,
          salary: Number(staff.salary),
          date_of_birth: formatDate(staff.date_of_birth),
          hire_date: formatDate(staff.hire_date),
        }),
      });
      const data = await response.json();
      console.log("Staff data:", data);
      const newStaff = { ...staff, staff_id: data.staff_id };
      setListStaff((prev) => [...prev, newStaff]);
      return data;
    } catch (error) {
      console.error("Error adding staff:", error);
      return { error: error.message };
    }
  };

  useEffect(() => {
    fetchHotel();
  }, []);

  const handleChangeHotel = (e) => {
    const { value } = e.target;
    fetchStaff(value);
    setStaff({ ...staff, hotel_id: value });
  };

  const handleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStaff({ ...staff, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsDialogOpen(false);
    await fetchStaffByHotel();
  };

  return (
    <>
      <h1 className="title roboto-regular">Staff Management</h1>
      <button onClick={handleDialog} className="submit-button">
        Add Staff
      </button>
      <select
        name="hotel_id"
        id="hotel_id"
        className="hotel-select"
        onChange={handleChangeHotel}
        defaultValue={""}
      >
        <option value="" disabled>
          Select Hotel
        </option>
        {listHotel.map((hotel) => (
          <option key={hotel.hotel_id} value={hotel.hotel_id}>
            {hotel.hotel_name}
          </option>
        ))}
      </select>

      {isDialogOpen && (
        <div className="dialog-overlay" onClick={() => handleDialog()}>
          <dialog open className="full-page-dialog">
            <form
              className="add-staff-form"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="form-title">Add New Staff</h3>
              <input
                type="text"
                name="staff_name"
                className="form-input"
                placeholder="First Name"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="staff_lastname"
                className="form-input"
                placeholder="Last Name"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="position"
                className="form-input"
                placeholder="Position"
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="salary"
                className="form-input"
                placeholder="Salary"
                onChange={handleChange}
                required
              />
              <label htmlFor="date_of_birth" className="form-label">
                Date of Birth
              </label>
              <input
                type="date"
                name="date_of_birth"
                className="form-input"
                placeholder="Date of Birth"
                onFocus={(e) => e.currentTarget.showPicker()}
                style={{ alignSelf: "flex-start" }}
                defaultValue={new Date().toISOString().split("T")[0]}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="phone"
                className="form-input"
                placeholder="Phone"
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="Email"
                onChange={handleChange}
                required
              />
              <label htmlFor="date_of_birth" className="form-label">
                Date of Hire
              </label>
              <input
                type="date"
                style={{ alignSelf: "flex-start" }}
                onFocus={(e) => e.currentTarget.showPicker()}
                defaultValue={new Date().toISOString().split("T")[0]}
                name="hire_date"
                className="form-input"
                onChange={handleChange}
                required
              />
              <button
                type="submit"
                className="form-button"
                onClick={handleSubmit}
              >
                Add Staff
              </button>
              <button className="btn-close" onClick={handleDialog}>
                x
              </button>
            </form>
          </dialog>
        </div>
      )}
      <table className="data-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Position</th>
            <th>Salary</th>
            <th>Hotel ID</th>
            <th>Date of Birth</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Hire Date</th>
          </tr>
        </thead>
        <tbody>
          {listStaff.length > 0 &&
            listStaff.map((staff) => (
              <tr key={staff.staff_id}>
                <td>{staff.staff_name}</td>
                <td>{staff.staff_lastname}</td>
                <td>{staff.position}</td>
                <td>{staff.salary}</td>
                <td>{staff.hotel_id}</td>
                <td>{FormatDate(staff.date_of_birth)}</td>
                <td>{staff.phone}</td>
                <td>{staff.email}</td>
                <td>{FormatDate(staff.hire_date)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default AddStaffForm;
