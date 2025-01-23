// import React from "react";


// const CustomerCard = ({ name, phone, onClick, onEdit, onDelete }) => {
//   // console.log("CustomerCard props:", { name, phone }); // Log props received by the card
  
//   return (
//     <div className="customer-card" onClick={onClick}>
//       <div className="customer-details">
//         <p>{name}</p>
//         <p>{phone}</p>
//       </div>
//       <div className="card-actions">
//         <button onClick={onEdit} className="edit-button">
//           Edit
//         </button>
//         <button onClick={onDelete} className="delete-button">
//           Delete
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CustomerCard;


import React from "react";
import { useNavigate } from "react-router-dom";

const CustomerCard = ({ name, phone, customerId, onEdit, onDelete }) => {
  const navigate = useNavigate();

  // Navigate to the CustomerDetailPage when the card is clicked
  const handleCardClick = () => {
    navigate(`/customer-detail/${customerId}`);
  };

  return (
    <div className="customer-card" onClick={handleCardClick}>
      <div className="customer-details">
        <p><strong></strong> {name}</p>
        <p><strong></strong> {phone}</p>
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
