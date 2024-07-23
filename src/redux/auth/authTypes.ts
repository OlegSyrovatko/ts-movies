export interface User {
  name: string | null;
  email: string | null;
  avatarURL: string | null;
  subscription: string | null;
  movieIds: string[] | null;
}

export interface AuthState {
  user: User;
  token: string | null;
  tokenRefresh: string | null;
  isLoggedIn: boolean;
  isFetchingCurrentUser: boolean;
}

export interface Credentials {
  name?: string;
  email: string;
  password: string;
}

export interface ForgotCredentials {
  email?: string;
  password?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  tokenRefresh: string | null;
}
export interface ForgotResponse {
  message: string;
}
