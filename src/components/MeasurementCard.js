import React from "react";

const MeasurementCard = ({ label, image, onChange }) => {
  return (
    <div className="measurement-card">
      <img src={image} alt={label} className="measurement-image" />
      <div className="measurement-input">
        <h3>{label}</h3>
        <input
          type="number"
          placeholder={`Enter ${label}`}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default MeasurementCard;
