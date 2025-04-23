import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateCabin, deleteCabin } from "@/services/apiCabins";
import type { Cabin } from "./useCabins";

export const useCreateCabin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUpdateCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });
};

export const useUpdateCabin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ newCabin, id }: { newCabin: Cabin; id: number }) =>
      createUpdateCabin(newCabin, id),
    onSuccess: () => {
      toast.success("Cabin successfully updated");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });
};

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      toast.success("Cabin successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });
}
