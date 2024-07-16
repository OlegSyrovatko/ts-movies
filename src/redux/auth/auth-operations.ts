import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthResponse, Credentials } from "./authTypes";
import { RootState } from "../../store";

// export const baseURL = "http://localhost:3000";
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
      return data;
    } catch (error: any) {
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
      return rejectWithValue(error.message);
    }
  }
);
export const refreshToken = createAsyncThunk<
  AuthResponse,
  void,
  { state: RootState }
>("auth/refreshToken", async (_, { getState, rejectWithValue }) => {
  const { auth } = getState();
  const { user, tokenRefresh } = auth;

  if (!tokenRefresh) {
    return rejectWithValue("No refresh token available");
  }

  try {
    const { data } = await axios.post<AuthResponse>(`/auth/refresh`, {
      email: user.email,
      tokenRefresh,
    });

    token.set(data.token);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

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
  logOut,
  AvDelete,
  AvUpload,
  fetchCurrentUser,
  refreshToken,
};
export default operations;
