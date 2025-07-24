import { updateCurrentUser } from "@/services/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      toast.success("User account updated successfully");
      queryClient.setQueryData(["user"], user);
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateUser, isUpdating };
}
