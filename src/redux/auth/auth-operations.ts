import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  AuthResponse,
  Credentials,
  VerifyEMLCredentials,
  ForgotCredentials,
  ResetCredentials,
  ForgotResponse,
} from "./authTypes";
import { RootState } from "../../store";
import { Notify } from "notiflix/build/notiflix-notify-aio";

//export const baseURL = "http://localhost:3000";
export const baseURL = "https://ts-nodejs-5beg.onrender.com";

axios.defaults.baseURL = baseURL;

const token = {
  set(token: string) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};

export const register = createAsyncThunk<AuthResponse, Credentials>(
  "auth/register",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<AuthResponse>(
        "auth/register",
        credentials
      );
      token.set(data.token);
      Notify.success("Check your e-mail to complete registration");
      return data;
    } catch (error: any) {
      Notify.failure(error.response.data.message);
      return rejectWithValue(error.message);
    }
  }
);

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
      Notify.failure(error.response.data.message);
      return rejectWithValue(error.message);
    }
  }
);

export const VerifyEML = createAsyncThunk<ForgotResponse, VerifyEMLCredentials>(
  "auth/verify",
  async ({ token }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<ForgotResponse>(`/auth/verify/${token}`);
      console.log(data);
      Notify.success(data.message);
      return data;
    } catch (error: any) {
      Notify.failure(error.response.data.message);
      return rejectWithValue(error.message);
    }
  }
);

export const ForgotPWD = createAsyncThunk<ForgotResponse, ForgotCredentials>(
  "auth/forgot-password",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<ForgotResponse>(
        "/auth/forgot-password",
        credentials
      );
      Notify.success(data.message);
      return data;
    } catch (error: any) {
      Notify.failure(error.response.data.message);
      return rejectWithValue(error.message);
    }
  }
);

export const ResetPWD = createAsyncThunk<ForgotResponse, ResetCredentials>(
  "auth/reset-password",
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<ForgotResponse>(
        `/auth/reset-password/${token}`,
        { password }
      );
      Notify.success(data.message);
      return data;
    } catch (error: any) {
      Notify.failure(error.response.data.message);
      return rejectWithValue(error.message);
    }
  }
);

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (email: string | null, { getState, rejectWithValue }) => {
    const state = getState() as RootState;

    const { tokenRefresh } = state.auth;

    try {
      const response = await axios.post("/auth/refresh", {
        email,
        tokenRefresh,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
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

export const logOut = createAsyncThunk<void>(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post("/auth/logout");
      token.unset();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCurrentUser = createAsyncThunk<
  AuthResponse,
  void,
  { state: RootState }
>("auth/refresh", async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const persistedToken = state.auth.token;

  if (persistedToken === null) {
    return thunkAPI.rejectWithValue("No token found");
  }

  token.set(persistedToken);
  try {
    const { data } = await axios.get<AuthResponse>("/auth/current");
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const operations = {
  register,
  logIn,
  VerifyEML,
  ForgotPWD,
  ResetPWD,
  logOut,
  AvDelete,
  AvUpload,
  fetchCurrentUser,
  refreshToken,
};
export default operations;
