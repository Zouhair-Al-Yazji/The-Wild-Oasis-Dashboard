import { updateSetting } from "@/services/apiSettings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { Settings } from "./useSettings";

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newSetting: Settings) => updateSetting(newSetting),
    onSuccess: () => {
      toast.success("Settings successfully updated");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (err) => toast.error(err.message),
  });
}
