import axios from "axios";

const API = axios.create({ baseURL: "https://tailorlog.onrender.com/api" });

export default API;
