import React from "react";


const CustomerCard = ({ name, phone, onClick, onEdit, onDelete }) => {
  // console.log("CustomerCard props:", { name, phone }); // Log props received by the card
  
  return (
    <div className="customer-card" onClick={onClick}>
      <div className="customer-details">
        <p>{name}</p>
        <p>{phone}</p>
      </div>
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
