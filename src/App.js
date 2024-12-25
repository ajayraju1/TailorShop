import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FaHome, FaUsers } from "react-icons/fa";  // Importing Font Awesome Icons
import HomePage from "./pages/HomePage";
import MeasurementsPage from "./pages/MeasurementsPage";
import StoragePage from "./pages/StoragePage";
import EditCustomerPage from "./EditCustomerPage";

const App = () => {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="navbar-brand">
            <h2>TailorShop</h2>
          </div>
          <div className="navbar-links">
            <button className="navbar-btn" onClick={() => window.location.href = '/'}>
              <FaHome size={24} /> {/* Home Icon */}
            </button>
            <button className="navbar-btn" onClick={() => window.location.href = '/storage'}>
              <FaUsers size={24} /> {/* Customers Icon */}
            </button>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/measurements/:gender" element={<MeasurementsPage />} />
          <Route path="/storage" element={<StoragePage />} />
          <Route path="/edit-customer" element={<EditCustomerPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
