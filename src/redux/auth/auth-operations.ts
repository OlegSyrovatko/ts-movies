// src/redux/auth-operations.ts
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Credentials, AuthResponse, User } from "./authTypes";
import { RootState } from "../../store"; // Adjust the import path as necessary

export const baseURL = "https://ts-nodejs-5beg.onrender.com";
// export const baseURL = = "https://connections-api.herokuapp.com";
// export const baseURL = = "http://localhost:3000";

axios.defaults.baseURL = baseURL;

const token = {
  set(token: string) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};

/*
 * POST @ /users/signup
 * body: { name, email, password }
 * После успешной регистрации добавляем токен в HTTP-заголовок
 */
export const register = createAsyncThunk<AuthResponse, Credentials>(
  "auth/register",
  async (credentials, { rejectWithValue }) => {
    console.log(credentials);

    try {
      const { data } = await axios.post<AuthResponse>(
        "auth/register",
        credentials
      );
      token.set(data.token);
      return data;
    } catch (error: any) {
      // TODO: Добавить обработку ошибки error.message
      return rejectWithValue(error.message);
    }
  }
);

/*
 * POST @ /users/login
 * body: { email, password }
 * После успешного логина добавляем токен в HTTP-заголовок
 */
export const logIn = createAsyncThunk<AuthResponse, Omit<Credentials, "name">>(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<AuthResponse>(
        "/auth/login",
        credentials
      );
      token.set(data.token);
      return data;
    } catch (error: any) {
      // TODO: Добавить обработку ошибки error.message
      return rejectWithValue(error.message);
    }
  }
);

export const AvDelete = createAsyncThunk<void>(
  "auth/deleteAvatar",
  async (_, { rejectWithValue }) => {
    try {
      await axios.delete("/auth/avatar");
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const AvUpload = createAsyncThunk<{ avatarURL: string }, File>(
  "auth/uploadAvatar",
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const { data } = await axios.patch<{ avatarURL: string }>(
        "/auth/avatar",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
/*
 * POST @ /users/logout
 * headers: Authorization: Bearer token
 * После успешного логаута, удаляем токен из HTTP-заголовка
 */

export const logOut = createAsyncThunk<void>(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post("/auth/logout");
      token.unset();
    } catch (error: any) {
      // TODO: Добавить обработку ошибки error.message
      return rejectWithValue(error.message);
    }
  }
);

/*
 * GET @ /users/current
 * headers:
 *    Authorization: Bearer token
 *
 * 1. Забираем токен из стейта через getState()
 * 2. Если токена нет, выходим не выполняя никаких операций
 * 3. Если токен есть, добавляет его в HTTP-заголовок и выполянем операцию
 */
export const fetchCurrentUser = createAsyncThunk<
  User,
  void,
  { state: RootState }
>("auth/refresh", async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const persistedToken = state.auth.token;

  if (persistedToken === null) {
    // Токена нет, уходим из fetchCurrentUser
    return thunkAPI.rejectWithValue("No token found");
  }

  token.set(persistedToken);
  try {
    const { data } = await axios.get<User>("/auth/current");
    return data;
  } catch (error: any) {
    // TODO: Добавить обработку ошибки error.message
    return thunkAPI.rejectWithValue(error.message);
  }
});

const operations = {
  register,
  logIn,
  logOut,
  AvDelete,
  AvUpload,
  fetchCurrentUser,
};
export default operations;
