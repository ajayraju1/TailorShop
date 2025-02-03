import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/LoginPage.css"; // We'll reuse the login page styles
import LoadingSpinner from "../components/LoadingSpinner";
import config from "../config/config.js";

const SignupPage = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pin, setPin] = useState(Array(6).fill(""));
  const [confirmPin, setConfirmPin] = useState(Array(6).fill(""));
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePinChange = (value, index) => {
    if (/^\d?$/.test(value)) {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);

      if (value && index < pin.length - 1) {
        const nextInput = document.querySelectorAll(".pin-box")[index + 1];
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      const prevInput = document.querySelectorAll(".pin-box")[index - 1];
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const handleConfirmPinChange = (value, index) => {
    if (/^\d?$/.test(value)) {
      const newConfirmPin = [...confirmPin];
      newConfirmPin[index] = value;
      setConfirmPin(newConfirmPin);

      if (value && index < confirmPin.length - 1) {
        const nextInput =
          document.querySelectorAll(".confirm-pin-box")[index + 1];
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  const handleConfirmPinKeyDown = (e, index) => {
    if (e.key === "Backspace" && !confirmPin[index] && index > 0) {
      const prevInput =
        document.querySelectorAll(".confirm-pin-box")[index - 1];
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const handleSignup = async () => {
    setError("");
    setSuccessMessage("");

    if (phoneNumber.length !== 10) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }

    if (
      pin.some((digit) => digit === "") ||
      confirmPin.some((digit) => digit === "")
    ) {
      setError("Please enter all digits of your PIN and confirm PIN");
      return;
    }

    if (pin.join("") !== confirmPin.join("")) {
      setError("PINs do not match");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${config.API_BASE_URL}/users/add-user`,
        {
          phone: phoneNumber,
          pin: pin.join(""),
        }
      );

      if (response.data.message === "User added successfully") {
        setSuccessMessage(
          "Account created successfully! Redirecting to login..."
        );

        setTimeout(() => {
          setPhoneNumber("");
          setPin(Array(6).fill(""));
          setConfirmPin(Array(6).fill(""));
        }, 100);

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.response?.status === 409) {
        setError(
          "This phone number is already registered. Please login instead."
        );
      } else {
        setError("Failed to create account. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="login-page">
      <h2>Create Account</h2>
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
        disabled={isLoading}
      />
      <div className="pin-section">
        <label>Enter PIN</label>
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
              disabled={isLoading}
            />
          ))}
        </div>
      </div>
      <div className="pin-section">
        <label>Confirm PIN</label>
        <div className="pin-input">
          {confirmPin.map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength="1"
              value={digit}
              onChange={(e) => handleConfirmPinChange(e.target.value, index)}
              onKeyDown={(e) => handleConfirmPinKeyDown(e, index)}
              onClick={(e) => e.target.select()}
              className="confirm-pin-box pin-box"
              disabled={isLoading}
            />
          ))}
        </div>
      </div>
      <button onClick={handleSignup} disabled={isLoading}>
        {isLoading ? "Creating Account..." : "Sign Up"}
      </button>
      <p className="login-link">
        Already have an account?{" "}
        <span onClick={() => !isLoading && navigate("/login")}>Login here</span>
      </p>
    </div>
  );
};

export default SignupPage;
