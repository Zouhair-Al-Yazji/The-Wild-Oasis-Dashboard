import { deleteBooking } from "@/services/apiBookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { Booking } from "./useBooking";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteBooking(id),
    onSuccess: (data: Booking) => {
      toast.success(`Booking #${data.id} deleted successfully`);
      queryClient.invalidateQueries({ queryKey: ["booking"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
}
