import Calendar from "../components/Calendar";

const Checkin = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Checkin Meanagement</h1>
      <div style={{ display: "flex" }}>
        <div style={{ maxWidth: "500px", width: "100%" }}>
          <Calendar />
        </div>
        <div style={{ width: "100%", padding: "0 20px" }}>
          <h2>Checkin</h2>
          <p>
            This is your main content area where you can manage your hotels,
            staff, bookings, and more.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Checkin;
