import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import MeasurementCard from "../components/MeasurementCard";

// Import images correctly
import shoulderImage from "../assets/images/Full-Shoulder.png";
import chestImage from "../assets/images/Full-Chest.png";
import waistImage from "../assets/images/Waist.png";

const MeasurementsPage = () => {
  const { gender } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    gender: gender,
    measurements: {},
  });

  const [currentCard, setCurrentCard] = useState(0);
  const [isEditing, setIsEditing] = useState(true); // Track if name and phone are in editing mode
  const [isNamePhoneSaved, setIsNamePhoneSaved] = useState(false); // Track if name and phone are saved
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State for showing success message

  const measurements = [
    { label: "Shoulder", image: shoulderImage },
    { label: "Chest", image: chestImage },
    { label: "Waist", image: waistImage },
  ];

  // Handle input change for measurements
  const handleInputChange = (key, value) => {
    setFormData({
      ...formData,
      measurements: { ...formData.measurements, [key]: value },
    });
  };

  // Save name and phone number
  const handleSaveNameAndPhone = () => {
    if (formData.name === "" || formData.phone === "") {
      alert("Please enter both Name and Phone before saving.");
      return; // Prevent submission if name or phone is empty
    }
    setIsEditing(false); // Switch to viewing mode after saving
    setIsNamePhoneSaved(true); // Mark name and phone as saved
  };

  // Submit customer details (including measurements)
  const handleSubmitMeasurements = async () => {
    if (!isNamePhoneSaved) {
      alert("Please save Name and Phone details first.");
      return; // Prevent submitting measurements if name and phone are not saved
    }

    try {
      await axios.post("http://localhost:5000/api/customers", formData);
      setShowSuccessMessage(true); // Show success message
      setTimeout(() => {
        setShowSuccessMessage(false); // Hide success message after 3 seconds
        navigate("/storage"); // Redirect to storage page
      }, 3000);
    } catch (error) {
      console.error("Error saving customer:", error);
      alert("Failed to save customer details.");
    }
  };

  // Navigation functions for the measurement cards
  const goToNext = () => {
    if (currentCard < measurements.length - 1) {
      setCurrentCard(currentCard + 1);
    }
  };

  const goToPrevious = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
    }
  };

  return (
    <div className="measurements-page">
      <h2 className="measurements-title">
        {gender === "men" ? "Men's Measurements" : "Women's Measurements"}
      </h2>
      <div className="form-container">
        {/* Conditional rendering of name and phone fields */}
        <div className="name-phone-container">
          {isEditing ? (
            <>
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input-field"
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="input-field"
              />
            </>
          ) : (
            <>
              <p className="display-text">{formData.name}</p>
              <p className="display-num">{formData.phone}</p>
            </>
          )}
        </div>

        {/* Button to save name and phone */}
        <button
          onClick={handleSaveNameAndPhone}
          className="save-name-phone-button"
          disabled={formData.name === "" || formData.phone === ""}
        >
          {isEditing ? "Save" : "Edit"}
        </button>

        {/* Displaying the current measurement card */}
        <div className="measurement-cards-row">
          <div className="measurement-card">
            <MeasurementCard
              key={measurements[currentCard].label}
              label={measurements[currentCard].label}
              image={measurements[currentCard].image}
              onChange={(value) =>
                handleInputChange(
                  measurements[currentCard].label.toLowerCase(),
                  value
                )
              }
            />
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="arrow-container">
          <button
            className={`arrow left ${currentCard === 0 ? "disabled" : ""}`}
            onClick={goToPrevious}
            disabled={currentCard === 0}
          >
            &#8592;
          </button>
          <button
            className={`arrow right ${currentCard === measurements.length - 1 ? "disabled" : ""}`}
            onClick={goToNext}
            disabled={currentCard === measurements.length - 1}
          >
            &#8594;
          </button>
        </div>

        {/* Show Save Measurements button only after the last measurement */}
        {currentCard === measurements.length - 1 && isNamePhoneSaved && (
          <button
            onClick={handleSubmitMeasurements}
            className="submit-button"
          >
            Save Measurements
          </button>
        )}
      </div>

      {/* Success Message Overlay */}
      {showSuccessMessage && (
        <div className="success-overlay">
          <div className="success-message">
            <h3>Customer details saved successfully!</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeasurementsPage;
