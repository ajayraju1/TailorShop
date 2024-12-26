import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const EditCustomerPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { customer } = location.state || {}; 
  const [formData, setFormData] = useState({
    measurements: customer ? customer.measurements : {},
  });

  useEffect(() => {
    if (!customer) {
      navigate("/storage"); 
    }
  }, [customer, navigate]);

  const handleInputChange = (key, value) => {
    setFormData({
      ...formData,
      measurements: { ...formData.measurements, [key]: value },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://tailorlog.onrender.com/api/customers/${customer._id}`,
        { measurements: formData.measurements }
      );
      alert("Customer measurements updated successfully!");
      navigate("/storage"); 
    } catch (error) {
      console.error("Error updating customer:", error);
      alert("Failed to update customer details.");
    }
  };

  return (
    <div className="edit-customer-page">
      <h2 className="edit-page-title">Edit Measurements</h2>
      <div className="customer-info"> 
  <p><strong className="label">Name:</strong> <span className="customer-detail">{customer.name}</span></p>
  <p><strong className="label">Phone:</strong> <span className="customer-detail">{customer.phone}</span></p>
</div>
      <form onSubmit={handleSubmit} className="edit-customer-form">
        <div>
          <h3 className="measurements-title">Measurements</h3>
          <div className="measurement-section">
            <div className="form-group">
              <label htmlFor="shoulder">Shoulder</label>
              <input
                type="number"
                id="shoulder"
                value={formData.measurements.shoulder || ""}
                onChange={(e) => handleInputChange("shoulder", e.target.value)}
                required
              />
              <div className="underline"></div>
            </div>
            <div className="form-group">
              <label htmlFor="chest">Chest</label>
              <input
                type="number"
                id="chest"
                value={formData.measurements.chest || ""}
                onChange={(e) => handleInputChange("chest", e.target.value)}
                required
              />
              <div className="underline"></div>
            </div>
            <div className="form-group">
              <label htmlFor="waist">Waist</label>
              <input
                type="number"
                id="waist"
                value={formData.measurements.waist || ""}
                onChange={(e) => handleInputChange("waist", e.target.value)}
                required
              />
              <div className="underline"></div>
            </div>
          </div>
        </div>

        <button type="submit" className="submit-button">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditCustomerPage;
