import React, { useState } from "react";

const CustomerCard = ({ name, phone, measurements, onEdit, onDelete }) => {
  const [showAllMeasurements, setShowAllMeasurements] = useState(false);

  const handleCardClick = () => {
    setShowAllMeasurements(!showAllMeasurements);
  };

  return (
    <div className="customer-card" onClick={handleCardClick}>
      <h3>{name}</h3>
      <p>Phone: {phone}</p>
      {/* Preview measurements */}
      {!showAllMeasurements ? (
        <>
          <p>Shoulder: {measurements?.shoulder}</p>
          <p>Chest: {measurements?.chest}</p>
          <p>Waist: {measurements?.waist}</p>
        </>
      ) : (
        // Display full measurements when card is clicked
        <>
          <p>Shoulder: {measurements?.shoulder}</p>
          <p>Chest: {measurements?.chest}</p>
          <p>Waist: {measurements?.waist}</p>
          <p>Bicep: {measurements?.bicep}</p>
          <p>Full Chest: {measurements?.fullChest}</p>
          <p>Full Crotch: {measurements?.fullCrotch}</p>
          <p>Full Shoulder: {measurements?.fullShoulder}</p>
          <p>Full Sleeves: {measurements?.fullSleeves}</p>
          <p>Hips: {measurements?.hips}</p>
          <p>Neck: {measurements?.neck}</p>
          <p>Thigh: {measurements?.thigh}</p>
          <p>Trouser Waist: {measurements?.trouserWaist}</p>
          <p>Trouser Hips: {measurements?.trouserHips}</p>
          <p>Trouser Length: {measurements?.trouserLength}</p>
          <p>Ankle: {measurements?.ankle}</p>
          <p>Jacket: {measurements?.jacket}</p>
        </>
      )}

      <div className="card-actions">
        <button onClick={onEdit} className="edit-button">
          Edit
        </button>
        <button onClick={onDelete} className="delete-button">
          Delete
        </button>
      </div>
    </div>
  );
};

export default CustomerCard;
