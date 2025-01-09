import Layout from "./Layout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Hotels from "./pages/Hotels";
import Staffs from "./pages/Staffs";
import Guest from "./pages/Guest";
import Booking from "./pages/Booking";
import Checkin from "./pages/Checkin";

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
          <Route path="/checkin" element={<Checkin />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
