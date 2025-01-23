import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import '../css/MeasurementsPage.css';

const MeasurementsPage = () => {
  const { gender } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    gender: gender,
  });

  const handleNext = () => {
    if (formData.name === "") {
      alert("Please enter Name before proceeding.");
      return;
    }
    
    // Only validate phone number length
    if (formData.phone.length !== 10) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }

    // Navigate to category selection page with the form data
    navigate(`/measurements/${gender}/categories`, { 
      state: { 
        name: formData.name, 
        phone: formData.phone,
        gender: gender 
      } 
    });
  };

  return (
    <div className="measurements-page">
      <h2 className="measurements-title">Customer Details</h2>
      
      <div className="form-container">
        <div className="name-phone-container">
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="input-field"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={formData.phone}
            maxLength="10"
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, ''); // Only allow digits
              if (value.length <= 10) {
                setFormData({ ...formData, phone: value });
              }
            }}
            className="input-field"
          />
        </div>

        <button
          onClick={handleNext}
          className="next-button"
          disabled={formData.name === "" || formData.phone === ""}
        >
          Save & Next
        </button>
      </div>
    </div>
  );
};

export default MeasurementsPage;
