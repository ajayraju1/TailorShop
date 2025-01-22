import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import MeasurementCard from "../components/MeasurementCard";
import '../css/MeasurementInputPage.css';

// Importing images
import neckImage from "../assets/images/Neck.png";
import fullShoulderImage from "../assets/images/Full-Shoulder.png";
import fullSleevesImage from "../assets/images/Full-Sleeves.png";
import bicepImage from "../assets/images/Bicep.png";
import fullChestImage from "../assets/images/Full-Chest.png";
import waistImage from "../assets/images/Waist.png";
import jacketImage from "../assets/images/Jacket.png";
import hipsImage from "../assets/images/Hips.png";

import thighImage from "../assets/images/Thigh.png";
import trouserWaistImage from "../assets/images/Trouser-Waist.png";
import trouserHipsImage from "../assets/images/Trouser-Hips.png";
import trouserLengthImage from "../assets/images/Trouser-Length.png";
import ankleImage from "../assets/images/Ankle.png";
import fullCrotchImage from "../assets/images/Full-Crotch.png";

const MeasurementInputPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, phone, gender, category } = location.state || {};
  const [currentIndex, setCurrentIndex] = useState(0);
  const [measurements, setMeasurements] = useState({});

  const shirtMeasurements = [
    { label: "Neck", image: neckImage },
    { label: "Full Chest", image: fullChestImage },
    { label: "Waist", image: waistImage },
    { label: "Jacket", image: jacketImage },
    { label: "Full Shoulder", image: fullShoulderImage },
    { label: "Bicep", image: bicepImage },
    { label: "Full Sleeves", image: fullSleevesImage },
    
  ];

  const pantMeasurements = [
    { label: "Hips", image: hipsImage },
    { label: "Thigh", image: thighImage },
    { label: "Trouser Waist", image: trouserWaistImage },
    { label: "Trouser Hips", image: trouserHipsImage },
    { label: "Trouser Length", image: trouserLengthImage },
    { label: "Ankle", image: ankleImage },
    { label: "Full Crotch", image: fullCrotchImage },
  ];

  const currentMeasurements = category === 'shirt' ? shirtMeasurements : pantMeasurements;

  const handleNext = () => {
    if (currentIndex < currentMeasurements.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };


  const handleMeasurementChange = (value) => {
    setMeasurements({
      ...measurements,
      [currentMeasurements[currentIndex].label.toLowerCase().replace(' ', '_')]: value
    });
  };

  const handleSubmit = async () => {
    try {
      const allMeasurementsEntered = currentMeasurements.every(
        m => measurements[m.label.toLowerCase().replace(' ', '_')]
      );
  
      if (!allMeasurementsEntered) {
        alert("Please enter all measurements before saving");
        return;
      }
  
      // Restructure the measurements object to match the backend schema
      const structuredMeasurements = {};
      currentMeasurements.forEach(measurement => {
        const key = measurement.label.toLowerCase().replace(' ', '_');
        structuredMeasurements[key] = measurements[key] || 0; // Default to 0 if no value
      });
  
      const measurementData = {
        customerInfo: {
          name,
          phone,
          gender
        },
        category,
        measurements: structuredMeasurements
      };
  
      const response = await axios.post("https://tailorlog.onrender.com/api/customers", measurementData);
  
      if (response.data) {
        alert("Measurements saved successfully!");
        navigate("/storage");
      }
    } catch (error) {
      console.error("Error details:", error.response?.data); // Log detailed error from server
      alert("Failed to save measurements. Please try again.");
    }
  };
  

  return (
    <div className="measurement-input-page">
      <div className="customer-info">
        <p>Name: {name}</p>
        <p>Phone: {phone}</p>
      </div>


      <h2>{category.charAt(0).toUpperCase() + category.slice(1)} Measurements</h2>

      <div className="measurement-container">
        <div className="measurement-progress">
          {currentIndex + 1} of {currentMeasurements.length}
        </div>

        <MeasurementCard
          label={currentMeasurements[currentIndex].label}
          image={currentMeasurements[currentIndex].image}
          onChange={handleMeasurementChange}
          value={measurements[currentMeasurements[currentIndex].label.toLowerCase().replace(' ', '_')] || ""}
        />

        <div className="navigation-buttons">
          <button onClick={handlePrevious} disabled={currentIndex === 0}>
            Previous
          </button>
          {currentIndex === currentMeasurements.length - 1 ? (
            <button onClick={handleSubmit} className="save-button">
              Save
            </button>
          ) : (
            <button onClick={handleNext}>Next</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MeasurementInputPage; 