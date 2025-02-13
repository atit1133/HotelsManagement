import { useEffect, useState } from "react";
import FormatDate from "../components/FormatDate";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const AddGuestForm = () => {
  const initailState = {
    first_name: "",
    last_name: "",
    date_of_birth: "",
    address: "",
    phone: "",
    email: "",
    guest_id: "",
    id_card: "",
  };
  const [guest, setGuest] = useState(initailState);

  const [listGuest, setListGuest] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGuest({ ...guest, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchAddGuest();
  };

  const fetchAddGuest = async () => {
    console.log(guest.id_card);
    const response = await fetch(`${apiUrl}/api/guest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(guest),
    });
    const data = await response.json();

    const newGust = {
      ...guest,
      guest_id: data.guest_id,
    };
    setListGuest((prev) => [...prev, newGust]);
    setGuest(initailState);
    return data;
  };

  const fetchGuest = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/guest/`);
      if (response.status === 404) {
        console.log(response.message);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (!data || Object.keys(data).length === 0) {
        console.warn("No data returned from the API");
        setGuest({ first_name: "Guest", email: "No data avilable" });
      } else {
        setListGuest(data);
      }
    } catch (error) {
      console.error("Error fetching guest data:", error);
    }
  };

  const fetchDeleteGuest = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/api/guest/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      setListGuest((prev) => prev.filter((guests) => guests.guest_id !== id));
      return data;
    } catch (error) {
      throw new Error("Http error an : " + error.message);
    }
  };

  const formatID = (input) => {};

  useEffect(() => {
    fetchGuest();
  }, []);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Guest Management</h1>

      <h3 style={{ textAlign: "left" }}>Guest Information</h3>
      <h4 style={{ textAlign: "left" }}>
        Please fill in the information below
      </h4>
      <form
        onSubmit={handleSubmit}
        style={(styles.form, { width: "60%", marginRight: "20px" })}
      >
        <input
          type="number"
          name="id_card"
          value={guest.id_card}
          placeholder="ID Card No."
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="first_name"
          value={guest.first_name}
          placeholder="First Name"
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="last_name"
          value={guest.last_name}
          placeholder="Last Name"
          onChange={handleChange}
          required
          style={styles.input}
        />
        <label
          style={{
            textAlign: "left",
            width: "100%",
            marginBottom: "5px",
            color: "#333",
          }}
        >
          Date of Birth
        </label>
        <input
          type="date"
          name="date_of_birth"
          value={guest.date_of_birth}
          onChange={handleChange}
          onFocus={(e) => e.currentTarget.showPicker()}
          required
          style={{ display: "block", ...styles.input }}
        />
        <input
          type="text"
          name="address"
          value={guest.address}
          placeholder="Address"
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="phone"
          value={guest.phone}
          placeholder="Phone"
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          value={guest.email}
          placeholder="Email"
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Add Guest
        </button>
      </form>
      <hr />
      <table className="data-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listGuest &&
            listGuest.map((res) => (
              <tr key={res.guest_id}>
                <td>{res.first_name}</td>
                <td>{res.last_name}</td>
                <td>{FormatDate(res.date_of_birth)}</td>
                <td>{res.address}</td>
                <td>{res.phone}</td>
                <td>{res.email}</td>
                <td>
                  <button onClick={() => fetchDeleteGuest(res.guest_id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    margin: "auto",
  },
  heading: {
    color: "#333",
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
    boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

export default AddGuestForm;
