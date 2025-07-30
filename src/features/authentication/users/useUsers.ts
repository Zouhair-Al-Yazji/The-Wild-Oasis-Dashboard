import { getUsers } from "@/services/apiAuth";
import { useQuery } from "@tanstack/react-query";

export type ProfileUser = {
  id: string;
  email: string;
  created_at: string;
  fullName: string;
  gender: "boy" | "girl";
  avatar: string;
};

export function useUsers() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["all-users"],
    queryFn: getUsers,
  });

  console.log(data);

  return {
    data,
    isError,
    isPending,
    error,
  };
}
