import React, { useState } from "react"; // Import useState from React
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; // Import Navigate from react-router-dom
import { FaHome, FaUsers } from "react-icons/fa"; 
import HomePage from "./pages/HomePage";
import MeasurementsPage from "./pages/MeasurementsPage";
import StoragePage from "./pages/StoragePage";
import EditCustomerPage from "./pages/EditCustomerPage";
import LoginPage from "./pages/LoginPage";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="navbar-brand">
            <h2>TailorLog</h2>
          </div>
          <div className="navbar-links">
            <button className="navbar-btn" onClick={() => window.location.href = '/'}>
              <FaHome size={24} />
            </button>
            <button className="navbar-btn" onClick={() => window.location.href = '/storage'}>
              <FaUsers size={24} />
            </button>
          </div>
        </nav>
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/measurements/:gender" element={isAuthenticated ? <MeasurementsPage /> : <Navigate to="/login" />} />
          <Route path="/storage" element={isAuthenticated ? <StoragePage /> : <Navigate to="/login" />} />
          <Route path="/edit-customer" element={isAuthenticated ? <EditCustomerPage /> : <Navigate to="/login" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

const NotFound = () => (
  <div className="not-found">
    <h2>Page Not Found</h2>
    <p>Sorry, the page you are looking for does not exist.</p>
  </div>
);

export default App;
