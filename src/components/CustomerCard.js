import React from "react";

const CustomerCard = ({ name, phone, measurements, onEdit, onDelete }) => {
  return (
    <div className="customer-card">
      <h3>{name}</h3>
      <p>Phone: {phone}</p>
      <p>Shoulder: {measurements?.shoulder}</p>
      <p>Chest: {measurements?.chest}</p>
      <p>Waist: {measurements?.waist}</p>
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
