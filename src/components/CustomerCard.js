import React from "react";
import { useNavigate } from "react-router-dom";

const CustomerCard = ({
  name,
  phone,
  customerId,
  gender,
  onEdit,
  onDelete,
}) => {
  const navigate = useNavigate();

  // Navigate to the CustomerDetailPage when the card is clicked
  const handleCardClick = () => {
    navigate(`/customer-detail/${customerId}`);
  };

  return (
    <div className="customer-card" onClick={handleCardClick}>
      <div className="customer-details">
        <p>
          <strong>{name}</strong>
        </p>
        <p>{phone}</p>
        <p className="customer-gender">{gender?.toUpperCase()}</p>
      </div>
      <div className="card-actions">
        {/* Edit button */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering card click
            onEdit();
          }}
          className="edit-button"
        >
          Edit
        </button>

        {/* Delete button */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering card click
            onDelete(e);
          }}
          className="delete-button"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CustomerCard;
