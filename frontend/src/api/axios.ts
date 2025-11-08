import axios from "axios";

const baseURL = "http://localhost:8000";

const api = axios.create({
  baseURL,
  withCredentials: true,
});

// Intercept 401 responses and redirect to login. This ensures that when the
// backend returns Unauthorized, the app clears stored credentials and sends
// the user back to the login page instead of showing an error state.
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err?.response?.status;
    const publicPaths = ["/login", "/register"];

    if (status === 401) {
      try {
        localStorage.removeItem("auth_token");
      } catch (e) {
        // ignore
      }
      
      delete api.defaults.headers.common["Authorization"];

      if (typeof window !== "undefined" && !publicPaths.includes(window.location.pathname)) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(err);
  }
);

export function setAuthToken(token?: string) {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
}

export default api;
