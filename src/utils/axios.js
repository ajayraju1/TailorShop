import axios from "axios";
import config from "../config/config";

const axiosInstance = axios.create({
  baseURL: config.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
  timeout: 10000,
});

// Add error interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      // Network or server error
      console.error("API not reachable");
      return Promise.reject(new Error("Unable to reach server"));
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
