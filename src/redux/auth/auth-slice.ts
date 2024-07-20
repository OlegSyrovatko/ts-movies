import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import authOperations, { refreshToken } from "./auth-operations";
import { AuthState, AuthResponse } from "./authTypes";

const initialState: AuthState = {
  user: {
    name: null,
    email: null,
    avatarURL: null,
    subscription: null,
    movieIds: null,
  },
  token: null,
  tokenRefresh: null,
  isLoggedIn: false,
  isFetchingCurrentUser: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        authOperations.register.fulfilled,
        (state, { payload }: PayloadAction<AuthResponse>) => {
          state.user = payload.user;
          state.token = payload.token;
          state.tokenRefresh = payload.tokenRefresh;
          state.isLoggedIn = true;
        }
      )
      .addCase(
        authOperations.logIn.fulfilled,
        (state, { payload }: PayloadAction<AuthResponse>) => {
          state.user = payload.user;
          state.token = payload.token;
          state.tokenRefresh = payload.tokenRefresh;
          state.isLoggedIn = true;
          localStorage.setItem("userEmail", payload.user.email || "");
        }
      )

      .addCase(refreshToken.fulfilled, (state, { payload }) => {
        state.token = payload.token;
        state.tokenRefresh = payload.tokenRefresh;
      })
      .addCase(refreshToken.rejected, (state) => {
        console.log("Refresh token rejected");
        state.token = null;
        state.tokenRefresh = null;
        state.isLoggedIn = false;
      })
      .addCase(authOperations.logOut.fulfilled, (state) => {
        state.user = {
          name: null,
          email: null,
          avatarURL: null,
          subscription: null,
          movieIds: null,
        };
        state.token = null;
        state.tokenRefresh = null;
        state.isLoggedIn = false;
        localStorage.removeItem("userEmail");
      })
      .addCase(authOperations.fetchCurrentUser.pending, (state) => {
        state.isFetchingCurrentUser = true;
      })
      .addCase(
        authOperations.fetchCurrentUser.fulfilled,
        (state, { payload }: PayloadAction<AuthResponse>) => {
          state.user = payload.user;
          state.token = payload.token;
          state.tokenRefresh = payload.tokenRefresh;
          state.isLoggedIn = true;
          state.isFetchingCurrentUser = false;
        }
      )
      .addCase(authOperations.fetchCurrentUser.rejected, (state) => {
        state.isFetchingCurrentUser = false;
      })
      .addCase(
        authOperations.AvUpload.fulfilled,
        (state, action: PayloadAction<{ avatarURL: string }>) => {
          state.user.avatarURL = action.payload.avatarURL;
          state.isFetchingCurrentUser = false;
        }
      )
      .addCase(authOperations.AvUpload.pending, (state) => {
        state.isFetchingCurrentUser = true;
      })
      .addCase(authOperations.AvUpload.rejected, (state) => {
        state.isFetchingCurrentUser = false;
      })
      .addCase(authOperations.AvDelete.fulfilled, (state) => {
        state.user.avatarURL = null;
        state.isFetchingCurrentUser = false;
      })
      .addCase(authOperations.AvDelete.pending, (state) => {
        state.isFetchingCurrentUser = true;
      })
      .addCase(authOperations.AvDelete.rejected, (state) => {
        state.isFetchingCurrentUser = false;
      });
  },
});

export default authSlice.reducer;
