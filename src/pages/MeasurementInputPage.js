import React, { useState, useRef, useEffect } from "react";
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
  const { name, phone, category } = location.state || {};
  const [currentIndex, setCurrentIndex] = useState(0);
  const [measurements, setMeasurements] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const inputRef = useRef(null);

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

  useEffect(() => {
    // Focus the input field whenever currentIndex changes
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentIndex]);

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
      // Validate name (minimum 2 characters)
      if (name.trim().length < 2) {
        alert("Please enter a valid name (minimum 2 characters)");
        return;
      }

      // Validate measurements (ensure all values are positive numbers)
      const structuredMeasurements = {};
      for (const measurement of currentMeasurements) {
        const key = measurement.label.toLowerCase().replace(' ', '_');
        const value = parseFloat(measurements[key]);
        
        if (isNaN(value) || value <= 0) {
          alert(`Please enter a valid measurement for ${measurement.label}`);
          return;
        }
        structuredMeasurements[key] = value;
      }

      const measurementData = {
        name: name.trim(),
        mobile: phone.trim(),
        category: category.toLowerCase(),
        measurements: structuredMeasurements,
        date: new Date().toISOString().split('T')[0] // Format as YYYY-MM-DD
      };

      console.log('Sending data:', measurementData);

      try {
        // Try to save the data
        await axios.post("https://tailorlog.onrender.com/api/customers", measurementData);
        handleSuccess();
      } catch (error) {
        // If error is 409 (Conflict) or contains "already existed", treat as success
        if (error.response?.status === 409 || 
            error.response?.data?.message?.includes('already existed')) {
          handleSuccess();
        } else {
          throw error; // Throw other errors to be caught by outer catch
        }
      }
    } catch (error) {
      console.error("Error details:", error);
      handleError(error);
    }
  };

  // Separate function to handle success
  const handleSuccess = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      navigate("/storage", { replace: true });
    }, 2500);
  };

  // Separate function to handle errors
  const handleError = (error) => {
    if (error.response?.data?.errors) {
      console.error("Validation errors:", error.response.data.errors);
      const errorMessage = Object.values(error.response.data.errors).join('\n');
      alert(`Validation errors:\n${errorMessage}`);
    } else {
      alert(error.response?.data?.message || "Failed to save measurements");
    }
  };

  return (
    <div className="measurement-input-page">
      <div className="customer-info">
        <p>{name}</p>
        <p>{phone}</p>
      </div>

      <h2>{category.charAt(0).toUpperCase() + category.slice(1)} Measurements</h2>

      <div className="measurement-container">
        <div className="measurement-progress">
          {currentIndex + 1} of {currentMeasurements.length}
        </div>

        <MeasurementCard
          ref={inputRef}
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

      {showSuccess && (
        <div className="success-overlay">
          <div className="success-message">
            <h3>Measurements saved successfully!</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeasurementInputPage;
