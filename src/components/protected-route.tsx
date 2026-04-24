import { Navigate } from "react-router-dom";
import type { PropsWithChildren } from "react";
import { useAppSelector } from "../store/hooks";

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
