import axios from "axios";
import Cookies from "js-cookie";

export const publicAPI = axios.create({
  baseURL: "https://the-whimsical.onrender.com/",
  withCredentials: true,
});

export const privateAPI = axios.create({
  baseURL: "https://the-whimsical.onrender.com/",
  withCredentials: true,
});

privateAPI.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
