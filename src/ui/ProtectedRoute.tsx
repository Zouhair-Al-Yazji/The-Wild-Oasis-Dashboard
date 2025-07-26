import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/features/authentication/users/useUser";
import Spinner from "./Spinner";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isPending } = useUser();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticated && !isPending) {
        navigate("/login");
      }
    },
    [navigate, isAuthenticated, isPending],
  );

  if (isPending)
    return (
      <div className="bg-background flex h-dvh items-center justify-center">
        <Spinner />
      </div>
    );

  if (isAuthenticated) return children;
}
