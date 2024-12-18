import React from "react";
import Layout from "./Layout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Hotels from "./pages/Hotels";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/hotels" element={<Hotels />} />
        </Routes>
        <h2>Welcome to the Hotels Management System</h2>
        <p>
          This is your main content area where you can manage your hotels,
          staff, bookings, and more.
        </p>
      </Layout>
    </Router>
  );
};

export default App;
