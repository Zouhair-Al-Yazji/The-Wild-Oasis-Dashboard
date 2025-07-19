import { deleteUser } from "@/services/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success(`User deleted successfully`);
      queryClient.invalidateQueries({ queryKey: ["all-users"] });
    },
    onError: (err) => toast.error(err.message),
  });
}
