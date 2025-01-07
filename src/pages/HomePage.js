import React from "react";
import { useNavigate } from "react-router-dom";
import menImage from "../assets/images/men bg.jpg"; 
import womenImage from "../assets/images/women bg.jpg"; 

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <h1>Add Measurements</h1>
      <div className="measurement-options">
        {/* Men Section */}
        <div className="category-card">
          <img src={menImage} alt="Men" />
          <button
            className="men-button"
            onClick={() => navigate("/measurements/men")}
          >
            Men
          </button>
        </div>

        {/* Women Section */}
        <div className="category-card">
          <img src={womenImage} alt="Women" />
          <button
            className="women-button"
            onClick={() => navigate("/measurements/women")}
          >
            Women
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;