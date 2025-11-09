import api from "./axios";
import type { AuthResponse } from "@/types";

export async function login(username: string, password: string) {
  const body = new URLSearchParams();
  body.append("username", username);
  body.append("password", password);

  const res = await api.post<AuthResponse>("/auth/login", body.toString(), {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  return { username: res.data.username };
}

export async function signup(username: string, password: string) {
  const res = await api.post<AuthResponse>("/auth/signup", { username, password });
  return { username: res.data.username };
}

export async function logout() {
  await api.post("/auth/logout");
}
