import React, { useState } from "react";
import axios from "axios";

const AddSalesDataForm = () => {
  const [sale, setSale] = useState({
    room_id: "",
    quantity: "",
    total_price: "",
    sale_date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSale({ ...sale, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/sales_data", sale)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Sales Data</h3>
      <div>
        <label htmlFor="room_id">Room ID:</label>
        <input
          type="number"
          name="room_id"
          placeholder="Room ID"
          value={sale.room_id}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={sale.quantity}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="total_price">Total Price:</label>
        <input
          type="number"
          name="total_price"
          placeholder="Total Price"
          value={sale.total_price}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="sale_date">Sale Date:</label>
        <input
          type="date"
          name="sale_date"
          value={sale.sale_date}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Add Sale</button>
    </form>
  );
};

export default AddSalesDataForm;
