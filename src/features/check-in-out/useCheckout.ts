import { updateBooking } from "@/services/apiBookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { Booking } from "../bookings/useBooking";

export function useCheckout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookingId: number) =>
      updateBooking(bookingId, { status: "checked-out" }),
    onSuccess: (data: Booking) => {
      toast.success(`Booking #${data.id} successfully checked out`);
      queryClient.invalidateQueries({ type: "active" });
    },
    onError: () => toast.error("There was an error while checking out"),
  });
}
