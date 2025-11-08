import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/userStore";

interface Props {
  children: React.ReactNode;
}

export default function PublicRoute({ children }: Props) {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
