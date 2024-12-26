import React from "react";

const ConfirmationModal = ({ isOpen, onConfirm, onCancel, message, position }) => {
  if (!isOpen) return null; 

  return (
    <div
      className="modal-overlay"
      style={{ top: `${position.top}px`, left: `${position.left}px` }}
    >
      <div className="modal">
        <h3>{message}</h3>
        <div className="modal-buttons">
          <button className="modal-btn cancel-btn" onClick={onCancel}>
            Cancel
          </button>
          <button className="modal-btn confirm-btn" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
