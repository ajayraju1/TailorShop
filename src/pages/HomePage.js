import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <h1>Add Measurements</h1>
      <div className="measurement-options">
        <button className="button men-button" onClick={() => navigate("/measurements/men")}>
          Men
        </button>
        <button className="button women-button" onClick={() => navigate("/measurements/women")}>
          Women
        </button>
      </div>
    </div>
  );
};

export default HomePage;
