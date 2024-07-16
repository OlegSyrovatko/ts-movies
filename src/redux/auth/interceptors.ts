import axios from "axios";
import { store } from "../../store";
import { refreshToken } from "./auth-operations";

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    const originalRequest = config;

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const { auth } = store.getState();
      if (auth.tokenRefresh) {
        const result = await store.dispatch(refreshToken());
        if (result.meta.requestStatus === "fulfilled") {
          const { auth: newAuth } = store.getState();
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${newAuth.token}`;
          originalRequest.headers["Authorization"] = `Bearer ${newAuth.token}`;
          return axios(originalRequest);
        } else {
          // Обробка помилки оновлення токена
          //   store.dispatch(authOperations.logOut());
          return Promise.reject(error);
        }
      }
    }

    return Promise.reject(error);
  }
);
