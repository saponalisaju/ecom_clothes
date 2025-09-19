// utils/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API || "http://localhost:5000/api",
});

export default instance;
