import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import authOperations, { refreshToken } from "./auth-operations";
import { AuthState, AuthResponse, ForgotResponse } from "./authTypes";

const initialState: AuthState = {
  user: {
    name: null,
    email: null,
    avatarURL: null,
    subscription: null,
    movieIds: [],
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
          state.isFetchingCurrentUser = false;
          // state.user = payload.user;
          // state.token = payload.token;
          // state.tokenRefresh = payload.tokenRefresh;
          // state.isLoggedIn = true;
        }
      )
      .addCase(authOperations.register.pending, (state) => {
        state.isFetchingCurrentUser = true;
      })
      .addCase(authOperations.register.rejected, (state, { payload }) => {
        state.isFetchingCurrentUser = false;
      })
      .addCase(
        authOperations.logIn.fulfilled,
        (state, { payload }: PayloadAction<AuthResponse>) => {
          state.user = payload.user;
          state.token = payload.token;
          state.tokenRefresh = payload.tokenRefresh;
          state.isLoggedIn = true;
          localStorage.setItem("userEmail", payload.user.email || "");
          state.isFetchingCurrentUser = false;
        }
      )
      .addCase(authOperations.logIn.rejected, (state, { payload }) => {
        state.isFetchingCurrentUser = false;
      })
      .addCase(authOperations.logIn.pending, (state) => {
        state.isFetchingCurrentUser = true;
      })
      .addCase(
        authOperations.ForgotPWD.fulfilled,
        (state, { payload }: PayloadAction<ForgotResponse>) => {
          state.isFetchingCurrentUser = false;
        }
      )
      .addCase(authOperations.ForgotPWD.rejected, (state, { payload }) => {
        state.isFetchingCurrentUser = false;
      })
      .addCase(authOperations.ForgotPWD.pending, (state) => {
        state.isFetchingCurrentUser = true;
      })
      .addCase(
        authOperations.ResetPWD.fulfilled,
        (state, { payload }: PayloadAction<ForgotResponse>) => {
          state.isFetchingCurrentUser = false;
        }
      )
      .addCase(authOperations.ResetPWD.rejected, (state, { payload }) => {
        state.isFetchingCurrentUser = false;
      })
      .addCase(authOperations.ResetPWD.pending, (state) => {
        state.isFetchingCurrentUser = true;
      })
      .addCase(refreshToken.fulfilled, (state, { payload }) => {
        state.token = payload.token;
        state.tokenRefresh = payload.tokenRefresh;
      })
      .addCase(refreshToken.rejected, (state) => {
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
          movieIds: [],
        };
        state.token = null;
        state.tokenRefresh = null;
        state.isLoggedIn = false;
        localStorage.removeItem("userEmail");
        state.isFetchingCurrentUser = false;
      })
      .addCase(authOperations.logOut.rejected, (state, { payload }) => {
        state.isFetchingCurrentUser = false;
      })
      .addCase(authOperations.logOut.pending, (state) => {
        state.isFetchingCurrentUser = true;
      })
      .addCase(authOperations.fetchCurrentUser.pending, (state) => {
        state.isFetchingCurrentUser = true;
      })
      .addCase(
        authOperations.fetchCurrentUser.fulfilled,
        (state, { payload }: PayloadAction<AuthResponse>) => {
          state.isLoggedIn = true;
          state.user = payload.user;
          state.token = payload.token;
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
      })
      .addCase(
        authOperations.addMovieToUser.fulfilled,
        (state, { payload }: any) => {
          console.log(payload.movieIds);

          state.user.movieIds = payload.movieIds;
          state.isFetchingCurrentUser = false;
        }
      )
      .addCase(authOperations.addMovieToUser.pending, (state) => {
        state.isFetchingCurrentUser = true;
      })
      .addCase(authOperations.addMovieToUser.rejected, (state) => {
        state.isFetchingCurrentUser = false;
      })
      .addCase(
        authOperations.removeMovieToUser.fulfilled,
        (state, { payload }: any) => {
          state.user.movieIds = payload.movieIds;
          console.log(payload.movieIds);
          state.isFetchingCurrentUser = false;
        }
      )
      .addCase(authOperations.removeMovieToUser.pending, (state) => {
        state.isFetchingCurrentUser = true;
      })
      .addCase(authOperations.removeMovieToUser.rejected, (state) => {
        state.isFetchingCurrentUser = false;
      });
  },
});

export default authSlice.reducer;
