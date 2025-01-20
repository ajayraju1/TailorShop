import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../css/LoginPage.css';

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pin, setPin] = useState(Array(6).fill(""));

  const handlePinChange = (value, index) => {
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("https://tailorlog.onrender.com/api/users/login", {
        phone: phoneNumber,
        pin: pin.join("")
      });
      console.log(response.data.message);
      onLogin();
      navigate('/');
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <div className="pin-input">
        {pin.map((digit, index) => (
          <input
            key={index}
            type="password"
            maxLength="1"
            value={digit}
            onChange={(e) => handlePinChange(e.target.value, index)}
            className="pin-box"
          />
        ))}
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
