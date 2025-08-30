import axios from "axios";
import Cookies from "js-cookie";
import dotenv from "dotenv";

dotenv.config();

export const publicAPI = axios.create({
  baseURL: process.env.FRONTEND_URL + "/api",
  withCredentials: true,
});

export const privateAPI = axios.create({
  baseURL: process.env.FRONTEND_URL + "/api",
  withCredentials: true,
});

privateAPI.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
