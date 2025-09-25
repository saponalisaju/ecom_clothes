import axios from "axios";
import clientURL from "./secret";

const api = axios.create({
  baseURL: `${clientURL}/api`,
  headers: {
    "Content-Type": "applications/json",
  },
  withCredentials: true,
});

export default api;
