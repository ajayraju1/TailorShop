import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios";
import MeasurementCard from "../components/MeasurementCard";
import "../css/MeasurementInputPage.css";
import config from "../config/config.js";
import LoadingSpinner from "../components/LoadingSpinner";
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
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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

  const currentMeasurements =
    category === "shirt" ? shirtMeasurements : pantMeasurements;

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
      [currentMeasurements[currentIndex].label.toLowerCase().replace(" ", "_")]:
        value,
    });
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setError("");

      // Validate measurements
      const structuredMeasurements = {};
      for (const measurement of currentMeasurements) {
        const key = measurement.label.toLowerCase().replace(" ", "_");
        const value = parseFloat(measurements[key]);

        if (isNaN(value) || value <= 0) {
          setError(`Please enter a valid measurement for ${measurement.label}`);
          return;
        }
        structuredMeasurements[key] = value;
      }

      const measurementData = {
        name: name.trim(),
        mobile: phone.trim(),
        category: category.toLowerCase(),
        measurements: structuredMeasurements,
        date: new Date().toISOString().split("T")[0],
      };

      const response = await axiosInstance.post("/customers", measurementData);

      console.log(response.data.success);

      if (response.data.message === "Customer created successfully") {
        setSuccessMessage("Measurements saved successfully!");
        setTimeout(() => {
          navigate("/storage", { replace: true });
        }, 100);
      }
    } catch (error) {
      if (error.response?.status === 409) {
        setSuccessMessage("Customer measurements updated successfully!");
        setTimeout(() => {
          navigate("/storage", { replace: true });
        }, 1000);
      } else {
        setError(error.response?.data?.message || "Error saving measurements");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="measurement-input-page">
      <div className="customer-info">
        <p>{name}</p>
        <p>{phone}</p>
      </div>

      <h2>
        {category.charAt(0).toUpperCase() + category.slice(1)} Measurements
      </h2>

      <div className="measurement-container">
        <div className="measurement-progress">
          {currentIndex + 1} of {currentMeasurements.length}
        </div>

        <MeasurementCard
          ref={inputRef}
          label={currentMeasurements[currentIndex].label}
          image={currentMeasurements[currentIndex].image}
          onChange={handleMeasurementChange}
          value={
            measurements[
              currentMeasurements[currentIndex].label
                .toLowerCase()
                .replace(" ", "_")
            ] || ""
          }
        />

        <div className="navigation-buttons">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0 || isLoading}
          >
            Previous
          </button>
          {currentIndex === currentMeasurements.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="save-button"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          ) : (
            <button onClick={handleNext} disabled={isLoading}>
              Next
            </button>
          )}
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
    </div>
  );
};

export default MeasurementInputPage;
