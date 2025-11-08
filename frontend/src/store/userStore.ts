import { create } from "zustand";
import { login as apiLogin, signup as apiSignup } from "@/api/auth";
import { setAuthToken } from "@/api/axios";
import type { AuthState } from "@/types";

const TOKEN_KEY = "auth_token";
const USERNAME_KEY = "username";

const initialToken = typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;
const initialUsername = typeof window !== "undefined" ? localStorage.getItem(USERNAME_KEY) : null;
if (initialToken) {
  setAuthToken(initialToken);
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: Boolean(localStorage.getItem(TOKEN_KEY)),
  token: localStorage.getItem(TOKEN_KEY),
  username: initialUsername,
  login: async (username: string, password: string) => {
    const { token, username: returnedUsername } = await apiLogin(username, password);
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USERNAME_KEY, returnedUsername);
    setAuthToken(token);
    set({ isAuthenticated: true, token, username: returnedUsername });
  },
  signup: async (username: string, password: string) => {
    const { token, username: returnedUsername } = await apiSignup(username, password);
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USERNAME_KEY, returnedUsername);
    setAuthToken(token);
    set({ isAuthenticated: true, token, username: returnedUsername });
  },
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USERNAME_KEY);
    setAuthToken(undefined);
    set({ isAuthenticated: false, token: null, username: null });
  },
}));

