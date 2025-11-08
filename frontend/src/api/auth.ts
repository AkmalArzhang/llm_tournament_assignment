import api, { setAuthToken } from "./axios";
import type { TokenResponse } from "@/types";

export async function login(username: string, password: string) {
  const body = new URLSearchParams();
  body.append("username", username);
  body.append("password", password);

  const res = await api.post<TokenResponse>("/auth/login", body.toString(), {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  const token = res.data.access_token;
  setAuthToken(token);
  return { token, username: res.data.username };
}

export async function signup(username: string, password: string) {
  const res = await api.post<TokenResponse>("/auth/signup", { username, password });
  const token = res.data.access_token;
  setAuthToken(token);
  return { token, username: res.data.username };
}
