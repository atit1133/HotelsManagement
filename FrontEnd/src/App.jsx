import Layout from "./Layout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Hotels from "./pages/Hotels";
import Staffs from "./pages/Staffs";

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
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
