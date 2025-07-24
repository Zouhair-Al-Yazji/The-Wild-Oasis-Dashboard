import { login as loginApi } from "@/services/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isPending } = useMutation({
    mutationFn: loginApi,
    onSuccess: (user) => {
      navigate("/dashboard", { replace: true });
      queryClient.setQueryData(["user"], user);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { login, isPending };
}
