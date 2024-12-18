import React, { useState } from "react";
import axios from "axios";

const AddPaymentForm = () => {
  const [payment, setPayment] = useState({
    booking_id: "",
    amount: "",
    payment_date: "",
    payment_method: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayment({ ...payment, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/payments", payment)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Payment</h3>
      <div>
        <label htmlFor="booking_id">Booking ID:</label>
        <input
          type="number"
          name="booking_id"
          placeholder="Booking ID"
          value={payment.booking_id}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={payment.amount}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="payment_date">Payment Date:</label>
        <input
          type="date"
          name="payment_date"
          value={payment.payment_date}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="payment_method">Payment Method:</label>
        <input
          type="text"
          name="payment_method"
          placeholder="Payment Method"
          value={payment.payment_method}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Add Payment</button>
    </form>
  );
};

export default AddPaymentForm;
