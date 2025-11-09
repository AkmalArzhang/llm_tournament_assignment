import axios from "axios";

const baseURL = "http://localhost:8000";

const api = axios.create({
  baseURL,
  withCredentials: true,
});

// Intercept 401 responses and redirect to login. This ensures that when the
// backend returns Unauthorized, the app sends the user back to the login page.
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err?.response?.status;
    const publicPaths = ["/login", "/register"];

    if (status === 401) {
      if (typeof window !== "undefined" && !publicPaths.includes(window.location.pathname)) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(err);
  }
);

export default api;
