import { RootState } from "../../store";
import { baseURL } from "../auth/auth-operations";
const getIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

const getUsername = (state: RootState) => state.auth.user?.name || null;
const getUseremail = (state: RootState) => state.auth.user?.email || null;
const getfavoriteMovies = (state: RootState) => state.auth.user?.movieIds || [];

export const getUserAvatar = (state: RootState) => {
  const avatarURL = state.auth.user?.avatarURL || null;
  return avatarURL ? `${baseURL}/${avatarURL}` : null;
};

const getIsFetchingCurrent = (state: RootState) =>
  state.auth.isFetchingCurrentUser;

const authSelectors = {
  getIsLoggedIn,
  getUsername,
  getIsFetchingCurrent,
  getUserAvatar,
  getUseremail,
  getfavoriteMovies,
};

export default authSelectors;
