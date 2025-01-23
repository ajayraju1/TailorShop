import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../css/CustomerDetailPage.css";

const CustomerDetailPage = () => {
  const { customerId } = useParams();
  const [customerData, setCustomerData] = useState(null);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get(
          `https://tailorlog.onrender.com/api/customers/${customerId}`
        );
        setCustomerData(response.data);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    fetchCustomerData();
  }, [customerId]);

  if (!customerData) return <div>Loading...</div>;

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
