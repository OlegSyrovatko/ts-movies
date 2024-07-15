// src/redux/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import authOperations from "./auth-operations";
import { AuthState, User } from "./authTypes";

const initialState: AuthState = {
  user: { name: null, email: null, avatarURL: null },
  token: null,
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
        (state, action: PayloadAction<{ user: User; token: string }>) => {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isLoggedIn = true;
        }
      )
      .addCase(
        authOperations.logIn.fulfilled,
        (state, action: PayloadAction<{ user: User; token: string }>) => {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isLoggedIn = true;
        }
      )
      .addCase(authOperations.logOut.fulfilled, (state) => {
        state.user = { name: null, email: null, avatarURL: null };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(authOperations.fetchCurrentUser.pending, (state) => {
        state.isFetchingCurrentUser = true;
      })
      .addCase(
        authOperations.fetchCurrentUser.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.user = action.payload;
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
          if (state.user) {
            state.user.avatarURL = action.payload.avatarURL;
          }
          state.isFetchingCurrentUser = false;
        }
      )
      .addCase(authOperations.AvUpload.pending, (state) => {
        state.isFetchingCurrentUser = true;
      })
      .addCase(authOperations.AvUpload.rejected, (state) => {
        state.isFetchingCurrentUser = false;
      })
      .addCase(
        authOperations.AvDelete.fulfilled,
        (state, action: PayloadAction<void>) => {
          if (state.user) {
            state.user.avatarURL = null;
          }
          state.isFetchingCurrentUser = false;
        }
      )
      .addCase(authOperations.AvDelete.pending, (state) => {
        state.isFetchingCurrentUser = true;
      })
      .addCase(authOperations.AvDelete.rejected, (state) => {
        state.isFetchingCurrentUser = false;
      });
  },
});
export default authSlice.reducer;
