export interface User {
  name: string | null;
  email: string | null;
  avatarURL: string | null;
}

export interface AuthState {
  user: User;
  token: string | null;
  isLoggedIn: boolean;
  isFetchingCurrentUser: boolean;
}

export interface Credentials {
  name?: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
