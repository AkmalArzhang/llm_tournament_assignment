import { create } from "zustand";
import { login as apiLogin, signup as apiSignup, logout as apiLogout } from "@/api/auth";
import type { AuthState } from "@/types";

const USERNAME_KEY = "username";

const initialUsername = typeof window !== "undefined" ? localStorage.getItem(USERNAME_KEY) : null;

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: Boolean(initialUsername),
  username: initialUsername,
  login: async (username: string, password: string) => {
    const { username: returnedUsername } = await apiLogin(username, password);
    localStorage.setItem(USERNAME_KEY, returnedUsername);
    set({ isAuthenticated: true, username: returnedUsername });
  },
  signup: async (username: string, password: string) => {
    const { username: returnedUsername } = await apiSignup(username, password);
    localStorage.setItem(USERNAME_KEY, returnedUsername);
    set({ isAuthenticated: true, username: returnedUsername });
  },
  logout: async () => {
    try {
      await apiLogout();
    } catch (e) {
      console.error("Logout error:", e);
    }
    localStorage.removeItem(USERNAME_KEY);
    set({ isAuthenticated: false, username: null });
  },
}));

