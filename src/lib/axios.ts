import { env } from "@/env";
import axios from "axios";

export const http = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true
});

http.interceptors.response.use(
  async (config) => {
    if (env.VITE_ENABLE_API_DELAY) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
    return config;
  },
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      !window.location.pathname.includes("/sign-in")
    ) {
      window.location.href = "/sign-in";
    }
    return Promise.reject(error);
  }
);
