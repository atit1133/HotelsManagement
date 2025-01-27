import React, { useState } from "react";
import AddBookingForm from "../forms/AddBookingForm";
import PromptPayQR from "../components/ModalPayment";

const Checkout = () => {
  const [dataForm, setDataForm] = useState("");
  const [payment, setPayment] = useState(false);
  const [openDia, setOpenDia] = useState(false);

  const openDialog = () => {
    setOpenDia(!openDia);
    console.log(openDia);
  };

  function checkoutRoom(data) {
    return setDataForm((prev) => [...prev, data]);
  }
  // function showModal() {
  //   return () => {
  //     setPayment(true);
  //     setOpenDia(true);
  //     console.log(payment);
  //     console.log(openDia);
  //   };
  // }
  return (
    <>
      <div>
        <h1>Checkout</h1>
        <AddBookingForm actions={false} sentBackData={checkoutRoom} />
      </div>
      <div>
        <h2>List Room Check Out</h2>
        <table className="data-table">
          <thead>
            <tr>
              <th> Item</th>
              <th>Room No.</th>
              <th>Check-in Date</th>
              <th>Check-out Date</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>1</td>
              <td>31-1-2025</td>
              <td>1-2-2025</td>
              <td>100</td>
            </tr>
            <tr>
              <td style={{ border: "0px" }}></td>
              <td style={{ border: "0px" }}></td>
              <td style={{ border: "0px" }}></td>
              <td style={{ border: "0px" }}>
                <div style={{ marginTop: "0px" }}>Vat 7%</div>
                <div style={{ marginTop: "10px" }}>Totol Amount</div>
              </td>
              <td style={{ border: "0px" }}>
                <div
                  style={{
                    height: "45px",
                  }}
                >
                  <div style={{ marginTop: "10px" }}>7</div>
                  <div style={{ marginTop: "10px" }}>107</div>
                </div>
                <hr />
              </td>
            </tr>
          </tbody>
        </table>
        <button className="submit-button" onClick={() => openDialog()}>
          Payment
        </button>
        {/* {openDia && <ModalPayment />} */}
        {openDia && <h1>Test Modal</h1>}
        {openDia && <PromptPayQR openDia={openDia} openDialog={openDialog} />}
      </div>
      {dataForm.length > 0 && (
        <div>
          <h2>Selected Data:</h2>
          <ul>
            {dataForm.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Checkout;
