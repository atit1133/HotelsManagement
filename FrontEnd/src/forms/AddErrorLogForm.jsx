import React, { useState } from "react";
import axios from "axios";

const AddErrorLogForm = () => {
  const [errorLog, setErrorLog] = useState({
    error_message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrorLog({ ...errorLog, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/error_logs", errorLog)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Error Log</h3>
      <div>
        <label htmlFor="error_message">Error Message:</label>
        <textarea
          name="error_message"
          placeholder="Error Message"
          value={errorLog.error_message}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Add Error Log</button>
    </form>
  );
};

export default AddErrorLogForm;
