import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateCabin, deleteCabin } from "@/services/apiCabins";
import type { Cabin } from "./useCabins";
import toast from "react-hot-toast";

// export const useCreateCabin = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: () => createUpdateCabin({} as Cabin, ""),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["cabins"] });
//     },
//   });
// };

// export const useUpdateCabin = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: () => createUpdateCabin({} as Cabin, ""),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["cabins"] });
//     },
//   });
// };

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
