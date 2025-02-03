import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config/config.js";
import "../css/LoginPage.css";

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pin, setPin] = useState(Array(6).fill(""));
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [ setIsLoading] = useState(false);

  const handlePinChange = (value, index) => {
    // Only allow numbers
    if (/^\d?$/.test(value)) {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);

      // Move to next input if a digit was entered and there is a next input
      if (value && index < pin.length - 1) {
        const nextInput = document.querySelectorAll(".pin-box")[index + 1];
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  const handleKeyDown = (e, index) => {
    // Handle backspace
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      // Move to previous input if current input is empty
      const prevInput = document.querySelectorAll(".pin-box")[index - 1];
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const handleLogin = async () => {
    setError("");
    setSuccessMessage("");

    if (phoneNumber.length !== 10) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }

    if (pin.some((digit) => digit === "")) {
      setError("Please enter all 6 digits of your PIN");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(`${config.API_BASE_URL}/users/login`, {
        phone: phoneNumber,
        pin: pin.join(""),
      });

      // Check if response has data and token
      if (response.data.message === "Login successful") {
        setSuccessMessage("Login successful!");
        onLogin(response.data.token);
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        setError("Invalid response from server");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(
        error.response?.data?.message || "Invalid credentials or server error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      <input
        type="tel"
        placeholder="Phone Number"
        value={phoneNumber}
        maxLength="10"
        onChange={(e) => {
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
      <p className="signup-link">
        Don't have an account?{" "}
        <span onClick={() => navigate("/signup")}>Sign up here</span>
      </p>
    </div>
  );
};

export default LoginPage;
