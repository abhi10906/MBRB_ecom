import axios from "axios";

export const axiosi = axios.create({
  withCredentials: true,
  baseURL: "https://mbrb.vercel.app",
});
