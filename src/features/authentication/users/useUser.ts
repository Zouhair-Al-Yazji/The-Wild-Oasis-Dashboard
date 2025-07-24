import { getCurrentUser } from "@/services/apiAuth";
import { useQuery } from "@tanstack/react-query";

export type User = {
  email: string;
  fullName: string;
  password: string;
  gender: "boy" | "girl";
  passwordConfirm?: string;
  avatar?: string;
};

export function useUser() {
  const { data: user, isPending } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    retry: false,
  });

  return {
    user,
    isPending,
    isAuthenticated: user?.role === "authenticated",
  };
}
