import Layout from "./Layout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Hotels from "./pages/Hotels";
import Staffs from "./pages/Staffs";
import Guest from "./pages/Guest";
import Booking from "./pages/Booking";
import Checkin from "./pages/Checkin";
import Checkout from "./pages/Checkout";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h2>Welcome to the Hotels Management System</h2>
                <p>
                  This is your main content area where you can manage your
                  hotels, staff, bookings, and more.
                </p>
              </div>
            }
          />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/staffs" element={<Staffs />} />
          <Route path="/guest" element={<Guest />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/booking/check-in" element={<Checkin />} />
          <Route path="/booking/check-out" element={<Checkout />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
