import Calendar from "../components/Calendar";
import AddBookingForm from "../forms/AddBookingForm";
import { useLocation } from "react-router-dom";
import {
  BsFillCaretDownSquareFill,
  BsFillCaretUpSquareFill,
} from "react-icons/bs";
import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
const Checkin = () => {
  const location = useLocation();
  const adjustedPath = location.pathname.replace("/booking", ""); // Adjust the pathname console.log(adjustedPath); // Log the adjusted pathname
  console.log(adjustedPath);
  const [show, setShow] = useState(false);

  function ShowAddData() {
    return setShow(!show);
  }
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Checkin Management</h1>
      <div style={{ display: "flex" }}>
        {/* <div style={{ maxWidth: "500px", width: "100%" }}>
          <Calendar />
        </div> */}
        <div style={{ width: "100%", padding: "0 20px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <h2>Checkin</h2>
            &nbsp;
            <div
              onClick={ShowAddData}
              style={{ fontSize: "20px", color: "red", marginTop: "4px" }}
            >
              {show ? (
                <BsFillCaretUpSquareFill />
              ) : (
                <BsFillCaretDownSquareFill />
              )}
            </div>
          </div>
          <AddBookingForm actions={show} />
        </div>
      </div>
    </div>
  );
};

export default Checkin;
