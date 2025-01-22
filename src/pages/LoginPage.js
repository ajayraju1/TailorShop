import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../css/LoginPage.css';

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pin, setPin] = useState(Array(6).fill(""));

  const handlePinChange = (value, index) => {
    // Only allow numbers
    if (/^\d?$/.test(value)) {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);
      
      // Move to next input if a digit was entered and there is a next input
      if (value && index < pin.length - 1) {
        const nextInput = document.querySelectorAll('.pin-box')[index + 1];
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  const handleKeyDown = (e, index) => {
    // Handle backspace
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      // Move to previous input if current input is empty
      const prevInput = document.querySelectorAll('.pin-box')[index - 1];
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const handleLogin = async () => {
    // Validate phone number before login
    if (phoneNumber.length !== 10) {
      alert("Please enter a valid 10-digit phone number");
      return;
    }

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
        type="tel"
        placeholder="Phone Number"
        value={phoneNumber}
        maxLength="10"
        onChange={(e) => {
          // Only allow numbers and maximum 10 digits
          const value = e.target.value;
          if (/^\d*$/.test(value) && value.length <= 10) {
            setPhoneNumber(value);
          }
        }}
      />
      <div className="pin-input">
        {pin.map((digit, index) => (
          <input
            key={index}
            type="text"
            inputMode="numeric"
            maxLength="1"
            value={digit}
            onChange={(e) => handlePinChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onClick={(e) => e.target.select()}
            className="pin-box"
          />
        ))}
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
