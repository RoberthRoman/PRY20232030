import axios, { AxiosError } from "axios";
import {
  axiosRequestInterceptor,
  axiosResponseErrorHandler,
} from "./interceptors";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export const axiosInstance = axios.create({
  baseURL: `${API_URL}`,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  request => axiosRequestInterceptor(request),
  (error: AxiosError) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  response => response,
  async error => await axiosResponseErrorHandler(error)
);