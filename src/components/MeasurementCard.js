import React, { forwardRef } from 'react';

const MeasurementCard = forwardRef(({ label, image, onChange, value }, ref) => {
  return (
    <div className="measurement-card">
      <img src={image} alt={label} className="measurement-image" />
      <h3>{label}</h3>
      <input
        ref={ref}
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="measurement-input"
        placeholder="Enter"
      />
    </div>
  );
});

export default MeasurementCard;
