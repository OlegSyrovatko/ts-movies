import axios from "axios";
import { store } from "../../store";
import { refreshToken } from "./auth-operations";

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const email = localStorage.getItem("userEmail");

      try {
        const actionResult = await store.dispatch(refreshToken(email));
        const newToken = actionResult.payload.token;

        if (newToken) {
          // Update the authorization header in the original request
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return axios(originalRequest); // Retry the original request with a new token
        }
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);

        store.dispatch({ type: "auth/logout" });
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
