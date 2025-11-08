// src/app/routes/index.ts
import Home from "./Home"
import Tournament from "./Tournament"
import Login from "./Login"
import Register from "./Register"
import NotFound from "./NotFound"

export const routeComponents = {
  Home,
  Tournament,
  Login,
  Register,
  NotFound,
} as const
