import { useState } from "react";

const AddGuestForm = () => {
  const [guest, setGuest] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    address: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGuest({ ...guest, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

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
          type="text"
          name="first_name"
          placeholder="First Name"
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="last_name"
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
          onChange={handleChange}
          onFocus={(e) => e.currentTarget.showPicker()}
          defaultValue={new Date().toISOString().slice(0, 10)}
          required
          style={{ display: "block", ...styles.input }}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="email"
          name="email"
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
          <tr>
            <td>John</td>
            <td>Doe</td>
            <td>01/01/1990</td>
            <td>123 Main St</td>
            <td>123-456-7890</td>
            <td>John@example.com</td>
            <td>Edit/Delete</td>
          </tr>
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
