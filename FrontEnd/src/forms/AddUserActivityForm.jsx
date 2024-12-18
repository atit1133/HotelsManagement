import React, { useState } from "react";
import axios from "axios";

const AddUserActivityForm = () => {
  const [activity, setActivity] = useState({
    user_id: "",
    activity_type: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setActivity({ ...activity, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/user_activities", activity)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add User Activity</h3>
      <div>
        <label htmlFor="user_id">User ID:</label>
        <input
          type="number"
          name="user_id"
          placeholder="User ID"
          value={activity.user_id}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="activity_type">Activity Type:</label>
        <input
          type="text"
          name="activity_type"
          placeholder="Activity Type"
          value={activity.activity_type}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Add Activity</button>
    </form>
  );
};

export default AddUserActivityForm;
