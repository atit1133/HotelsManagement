import { useState } from "react";
import "./AddStaffForm.css";
// import axios from "axios";

const AddStaffForm = () => {
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

  const handleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStaff({ ...staff, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // axios
    //   .post("http://localhost:3001/staff", staff)
    //   .then((response) => console.log(response))
    //   .catch((error) => console.log(error));
  };

  return (
    <>
      <h1 className="title roboto-regular">Staff Management</h1>
      <button onClick={handleDialog} className="submit-button">
        Add Staff
      </button>

      {isDialogOpen && (
        <dialog open className="full-page-dialog">
          <form className="add-staff-form" onSubmit={handleSubmit}>
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
            <input
              type="number"
              name="hotel_id"
              className="form-input"
              placeholder="Hotel ID"
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
              name="hire_date"
              className="form-input"
              onChange={handleChange}
              required
            />
            <button type="submit" className="form-button">
              Add Staff
            </button>
            <button className="btn-close" onClick={handleDialog}>
              x
            </button>
          </form>
        </dialog>
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
            <th>Password</th>
            <th>Hire Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John</td>
            <td>Doe</td>
            <td>Manager</td>
            <td>60000</td>
            <td>1</td>
            <td>1990-01-01</td>
            <td>02-123-5843</td>
            <td>Jonh.doe@example.com</td>
            <td>P@ssWord</td>
            <td>2020-01-01</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default AddStaffForm;
