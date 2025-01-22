import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../css/CategorySelectionPage.css';

const CategorySelectionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, phone, gender } = location.state || {};
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleNext = () => {
    if (!selectedCategory) {
      alert("Please select a category");
      return;
    }
    navigate(`/measurements/${gender}/${selectedCategory}`, {
      state: {
        name,
        phone,
        gender,
        category: selectedCategory
      }
    });
  };

  return (
    <div className="category-page">
      <div className="customer-info">
        <p>Name: {name}</p>
        <p>Phone: {phone}</p>
      </div>

      <div className="category-selection">
        <h2>Select Measurement</h2>
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-dropdown"
        >
          <option value="">Select Category</option>
          <option value="shirt">Shirt</option>
          <option value="pant">Pant</option>
        </select>

        <button 
          onClick={handleNext}
          className="next-button"
          disabled={!selectedCategory}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CategorySelectionPage; 