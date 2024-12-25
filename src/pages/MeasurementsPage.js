// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import MeasurementCard from "../components/MeasurementCard";

// // Import images correctly
// import shoulderImage from "../assets/images/Full-Shoulder.png";
// import chestImage from "../assets/images/Full-Sleeves.png";
// import waistImage from "../assets/images/Waist.png";

// const MeasurementsPage = () => {
//   const { gender } = useParams();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     gender: gender,
//     measurements: {},
//   });

//   const measurements = [
//     { label: "Shoulder", image: shoulderImage },
//     { label: "Chest", image: chestImage },
//     { label: "Waist", image: waistImage },
//   ];

//   const handleInputChange = (key, value) => {
//     setFormData({
//       ...formData,
//       measurements: { ...formData.measurements, [key]: value },
//     });
//   };

//   const handleSubmit = async () => {
//     try {
//       await axios.post("http://localhost:5000/api/customers", formData);
//       alert("Customer details saved successfully!");
//       navigate("/storage");
//     } catch (error) {
//       console.error("Error saving customer:", error);
//       alert("Failed to save customer details.");
//     }
//   };

//   return (
//     <div className="measurements-page">
//       <h2 className="measurements-title">
//         {gender === "men" ? "Men's Measurements" : "Women's Measurements"}
//       </h2>
//       <div className="form-container">
//         <input
//           type="text"
//           placeholder="Name"
//           value={formData.name}
//           onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//           className="input-field"
//         />
//         <input
//           type="text"
//           placeholder="Phone Number"
//           value={formData.phone}
//           onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//           className="input-field"
//         />
//         {measurements.map((item) => (
//           <MeasurementCard
//             key={item.label}
//             label={item.label}
//             image={item.image}
//             onChange={(value) => handleInputChange(item.label.toLowerCase(), value)}
//           />
//         ))}
//         <button onClick={handleSubmit} className="submit-button">
//           Save Measurements
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MeasurementsPage;


import React, { useState } from "react"; 
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import MeasurementCard from "../components/MeasurementCard";

// Import images correctly
import shoulderImage from "../assets/images/Full-Shoulder.png";
import chestImage from "../assets/images/Full-Chest.png";
import waistImage from "../assets/images/Waist.png";

const MeasurementsPage = () => {
  const { gender } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    gender: gender,
    measurements: {},
  });

  const [currentCard, setCurrentCard] = useState(0);

  const measurements = [
    { label: "Shoulder", image: shoulderImage },
    { label: "Chest", image: chestImage },
    { label: "Waist", image: waistImage },
  ];

  const handleInputChange = (key, value) => {
    setFormData({
      ...formData,
      measurements: { ...formData.measurements, [key]: value },
    });
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/api/customers", formData);
      alert("Customer details saved successfully!");
      navigate("/storage");
    } catch (error) {
      console.error("Error saving customer:", error);
      alert("Failed to save customer details.");
    }
  };

  const goToNext = () => {
    if (currentCard < measurements.length - 1) {
      setCurrentCard(currentCard + 1);
    }
  };

  const goToPrevious = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
    }
  };

  return (
    <div className="measurements-page">
      <h2 className="measurements-title">
        {gender === "men" ? "Men's Measurements" : "Women's Measurements"}
      </h2>
      <div className="form-container">
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="input-field"
        />

        <div className="measurement-cards-row">
          {/* Display only the current card */}
          <div className="measurement-card">
            <MeasurementCard
              key={measurements[currentCard].label}
              label={measurements[currentCard].label}
              image={measurements[currentCard].image}
              onChange={(value) =>
                handleInputChange(
                  measurements[currentCard].label.toLowerCase(),
                  value
                )
              }
            />
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="arrow-container">
          <button
            className={`arrow left ${currentCard === 0 ? "disabled" : ""}`}
            onClick={goToPrevious}
            disabled={currentCard === 0}
          >
            &#8592;
          </button>
          <button
            className={`arrow right ${
              currentCard === measurements.length - 1 ? "disabled" : ""
            }`}
            onClick={goToNext}
            disabled={currentCard === measurements.length - 1}
          >
            &#8594;
          </button>
        </div>

        <button onClick={handleSubmit} className="submit-button">
          Save Measurements
        </button>
      </div>
    </div>
  );
};

export default MeasurementsPage;
