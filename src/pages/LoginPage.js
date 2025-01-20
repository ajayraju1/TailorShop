// import React, { useState } from "react";
// import axios from "axios";
// import '../css/LoginPage.css';

// const LoginPage = ({ onLogin }) => {
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [pin, setPin] = useState(Array(6).fill(""));
//   const [otp, setOtp] = useState("");
//   const [isChangingPin, setIsChangingPin] = useState(false);
//   const [newPin, setNewPin] = useState(Array(6).fill(""));

//   const handlePinChange = (value, index) => {
//     const newPin = [...pin];
//     newPin[index] = value;
//     setPin(newPin);
//   };

//   const handleLogin = async () => {
//     try {
//       const response = await axios.post("https://tailorlog.onrender.com/api/users/login", {
//         phone: phoneNumber,
//         pin: pin.join(""),
//       });
//       console.log(response.data.message);
//       onLogin(); // Call onLogin after successful login
//     } catch (error) {
//       console.error("Error logging in:", error);
//     }
//   };

//   const handleSendOtp = async () => {
//     try {
//       await axios.post("https://tailorlog.onrender.com/api/users/send-otp", {
//         phone: phoneNumber,
//       });
//       console.log("OTP sent successfully");
//     } catch (error) {
//       console.error("Error sending OTP:", error);
//     }
//   };

//   const handleChangePin = async () => {
//     try {
//       await axios.post("https://tailorlog.onrender.com/api/users/change-pin", {
//         phone: phoneNumber,
//         otp,
//         newPin: newPin.join(""),
//       });
//       console.log("PIN changed successfully");
//     } catch (error) {
//       console.error("Error changing PIN:", error);
//     }
//   };

//   return (
//     <div className="login-page">
//       <h2>Login</h2>
//       <input
//         type="text"
//         placeholder="Phone Number"
//         value={phoneNumber}
//         onChange={(e) => setPhoneNumber(e.target.value)}
//       />
//       <div className="pin-input">
//         {pin.map((digit, index) => (
//           <input
//             key={index}
//             type="password"
//             maxLength="1"
//             value={digit}
//             onChange={(e) => handlePinChange(e.target.value, index)}
//             className="pin-box"
//           />
//         ))}
//       </div>
//       <button onClick={handleLogin}>Login</button>

//       {isChangingPin ? (
//         <div className="change-pin-section">
//           <h3>Change PIN</h3>
//           <input
//             type="text"
//             placeholder="Enter OTP"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//           />
//           <div className="pin-input">
//             {newPin.map((digit, index) => (
//               <input
//                 key={index}
//                 type="password"
//                 maxLength="1"
//                 value={digit}
//                 onChange={(e) => {
//                   const newPinArr = [...newPin];
//                   newPinArr[index] = e.target.value;
//                   setNewPin(newPinArr);
//                 }}
//                 className="pin-box"
//               />
//             ))}
//           </div>
//           <button onClick={handleChangePin}>Verify OTP & Change PIN</button>
//         </div>
//       ) : (
//         <button onClick={() => { handleSendOtp(); setIsChangingPin(true); }}>Change PIN</button>
//       )}
//     </div>
//   );
// };

// export default LoginPage;


import React, { useState } from "react";
// import API from "../api"; // Import the Axios instance
import '../css/LoginPage.css';
import axios from "axios";

const LoginPage = ({ onLogin }) => {
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
      onLogin(); // Convert this function after successfull login it should redirect to home page
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
