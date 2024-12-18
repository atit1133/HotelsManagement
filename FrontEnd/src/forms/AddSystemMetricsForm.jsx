import React, { useState } from "react";
import axios from "axios";

const AddSystemMetricsForm = () => {
  const [metric, setMetric] = useState({
    metric_name: "",
    metric_value: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMetric({ ...metric, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/system_metrics", metric)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add System Metric</h3>
      <div>
        <label htmlFor="metric_name">Metric Name:</label>
        <input
          type="text"
          name="metric_name"
          placeholder="Metric Name"
          value={metric.metric_name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="metric_value">Metric Value:</label>
        <input
          type="number"
          name="metric_value"
          placeholder="Metric Value"
          value={metric.metric_value}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Add Metric</button>
    </form>
  );
};

export default AddSystemMetricsForm;
