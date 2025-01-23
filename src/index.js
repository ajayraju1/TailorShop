import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';  // Your main App component
import './App.css'; 
import reportWebVitals from './reportWebVitals';
import 'font-awesome/css/font-awesome.min.css';  // If you're using Font Awesome

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />  {/* Render only the App component */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
