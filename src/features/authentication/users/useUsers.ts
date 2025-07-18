import { getUsers } from "@/services/apiAuth";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export type SimplifiedUser = {
  id: string;
  email: string;
  created_at: string;
  fullName: string;
  gender: "boy" | "girl";
  avatar: string;
};

export function useUsers() {
  //QUERY
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["all-users"],
    queryFn: getUsers,
  });

  const simplifiedUsers: SimplifiedUser[] = data?.users
    ? data.users?.map((user) => ({
        id: user.id,
        email: user.email ? user.email : "",
        created_at: user.created_at,
        fullName: user.user_metadata.fullName,
        avatar: user.user_metadata.avatar,
        gender: user.user_metadata.gender,
      }))
    : [];

  return {
    users: data?.users,
    simplifiedUsers,
    count: data?.total || 0,
    isError,
    isPending,
    error,
  };
}
