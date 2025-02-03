import axios from "axios";

const API = axios.create({ baseURL: "http://loaclhost:3500/api" });

export default API;
