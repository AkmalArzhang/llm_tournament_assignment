import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import { routeLinks } from "./routes/routeLinks";
import { routeComponents } from "./routes/pages";
import "@mantine/core/styles.css";
import "@/styles/global.css";
import { AppLayout } from "./components/layout/AppLayout";

function App() {
  return (
    <AppLayout>
      <Routes>
        {routeLinks.map(({ uri, component, private: isPrivate }) => {
          const Component = routeComponents[component];
          if (!Component) return null;

          const Element = isPrivate ? (
            <PrivateRoute>
              <Component />
            </PrivateRoute>
          ) : (
            <PublicRoute>
              <Component />
            </PublicRoute>
          );

          return <Route key={uri} path={uri} element={Element} />;
        })}
      </Routes>
    </AppLayout>
  );
}

export default App;
