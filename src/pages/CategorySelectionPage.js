import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/CategorySelectionPage.css";

const CategorySelectionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, phone, gender } = location.state || {};
  const [selectedCategory, setSelectedCategory] = useState("");

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
        category: selectedCategory,
      },
    });
  };

  return (
    <div className="category-page">
      <div className="customer-info">
        <p>{name}</p>
        <p>{phone}</p>
      </div>

      <div className="category-selection">
        <h2>Select Item</h2>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-dropdown"
        >
          <option value="">Select </option>
          <option value="shirt">Shirt</option>
          <option value="pant">Pant</option>
        </select>

        <button
          onClick={handleNext}
          className="next-button-cat"
          disabled={!selectedCategory}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CategorySelectionPage;
