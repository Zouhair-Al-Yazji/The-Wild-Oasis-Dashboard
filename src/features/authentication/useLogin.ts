import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { login as loginApi } from "@/services/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isPending } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.user);
      navigate("/dashboard", { replace: true });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { login, isPending };
}
