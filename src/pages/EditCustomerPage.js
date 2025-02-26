import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import axiosInstance from "../utils/axios";

const EditCustomerPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { customer } = location.state || {};

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const measurementFields = [
    { label: "Neck", key: "neck" },
    { label: "Full Shoulder", key: "full_shoulder" },
    { label: "Full Sleeves", key: "full_sleeves" },
    { label: "Bicep", key: "bicep" },
    { label: "Full Chest", key: "full_chest" },
    { label: "Waist", key: "waist" },
    { label: "Jacket", key: "jacket" },
    { label: "Hips", key: "hips" },
    { label: "Thigh", key: "thigh" },
    { label: "Trouser Waist", key: "trouser_waist" },
    { label: "Trouser Hips", key: "trouser_hips" },
    { label: "Trouser Length", key: "trouser_length" },
    { label: "Ankle", key: "ankle" },
    { label: "Full Crotch", key: "full_crotch" },
  ];

  useEffect(() => {
    if (!customer) {
      navigate("/storage");
      return;
    }
    setFormData({
      name: customer.name,
      phone: customer.phone || customer.mobile,
      measurements: { ...customer.measurements },
    });
  }, [customer, navigate]);

  const handleInputChange = (key, value) => {
    if (value === "" || (parseFloat(value) >= 0 && parseFloat(value) <= 100)) {
      setFormData((prevData) => ({
        ...prevData,
        measurements: {
          ...prevData.measurements,
          [key]: value,
        },
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");

      const response = await axiosInstance.put(`/customers/${customer._id}`, {
        name: formData.name,
        mobile: formData.phone,
        measurements: formData.measurements,
      });
      if (response.data.message === "Customer updated successfully") {
        setSuccessMessage("Customer updated successfully!");
        setTimeout(() => {
          navigate("/storage");
        }, 1000);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Error updating customer");
    } finally {
      setLoading(false);
    }
  };

  if (!formData) return <LoadingSpinner />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="edit-customer-page">
      <h2 className="edit-page-title">Edit Measurements</h2>
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      {error && <div className="error-message">{error}</div>}
      <div className="customer-info">
        <p>
          <span className="customer-detail">{formData.name}</span>
        </p>
        <p>
          <span className="customer-detail">{formData.phone}</span>
        </p>
      </div>
      <form onSubmit={handleSubmit} className="edit-customer-form">
        <h3 className="measurement-title">Measurements</h3>
        <div className="measurement-section">
          {measurementFields.map(({ label, key }) => (
            <div className="form-group" key={key}>
              <label htmlFor={key}>{label}</label>
              <input
                type="number"
                id={key}
                value={formData.measurements[key] || ""}
                onChange={(e) => handleInputChange(key, e.target.value)}
                min="0"
                max="100"
                step="0.1"
                required
              />
            </div>
          ))}
        </div>
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditCustomerPage;
