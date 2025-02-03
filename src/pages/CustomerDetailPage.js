import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axios";
import "../css/common.css";
import "../css/CustomerDetailPage.css";

const CustomerDetailPage = () => {
  const { customerId } = useParams();
  const [customerData, setCustomerData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/customers/${customerId}`);
        if (response.data) {
          setCustomerData(response.data);
        } else {
          setError("Customer data not found");
        }
      } catch (error) {
        setError(
          error.response?.data?.message || "Error fetching customer data"
        );
        console.error("Error fetching customer data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, [customerId]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!customerData) return <div className="error-message">No data found</div>;

  return (
    <div className="customer-detail-page">
      <div className="header">
        <div>
          <h2>{customerData.name}</h2>
          <p>{customerData.mobile}</p>
        </div>
        <a href={`tel:${customerData.mobile}`} className="phone-icon">
          📞
        </a>
      </div>

      <h3>Measurements</h3>
      <div className="measurement-cards">
        {Object.entries(customerData.measurements).map(([key, value]) => (
          <div className="measurement-card" key={key}>
            <h4>{key.replace("_", " ").toUpperCase()}</h4>
            <p>{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerDetailPage;
