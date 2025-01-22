import React from 'react';
import { useLocation } from 'react-router-dom';

const CustomerDetailsPage = () => {
  const { state: { customer } } = useLocation();

  // Destructure customer details for easy access
  const { name, phone, category, measurements } = customer || {};

  // Separate measurements by category
  const shirtMeasurements = category === 'shirt' ? measurements : {};
  const pantMeasurements = category === 'pant' ? measurements : {};

  return (
    <div className="customer-details-page">
      <h2>Customer Details</h2>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Phone:</strong> {phone}</p>

      {category === 'shirt' && shirtMeasurements && Object.keys(shirtMeasurements).length > 0 && (
        <div className="measurements">
          <h3>Shirt Measurements</h3>
          {Object.entries(shirtMeasurements).map(([key, value]) => (
            <div key={key}>
              <strong>{key.replace('_', ' ').toUpperCase()}:</strong> {value}
            </div>
          ))}
        </div>
      )}

      {category === 'pant' && pantMeasurements && Object.keys(pantMeasurements).length > 0 && (
        <div className="measurements">
          <h3>Pant Measurements</h3>
          {Object.entries(pantMeasurements).map(([key, value]) => (
            <div key={key}>
              <strong>{key.replace('_', ' ').toUpperCase()}:</strong> {value}
            </div>
          ))}
        </div>
      )}

      {(!shirtMeasurements || Object.keys(shirtMeasurements).length === 0) &&
       (!pantMeasurements || Object.keys(pantMeasurements).length === 0) && (
        <p>No measurements available for this customer.</p>
      )}
    </div>
  );
};

export default CustomerDetailsPage;
