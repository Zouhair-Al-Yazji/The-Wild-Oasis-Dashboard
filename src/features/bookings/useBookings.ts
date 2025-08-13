import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import type { Booking } from "./useBooking";

export function useBookings() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });

  return {
    data: data as Booking[] | undefined,
    isPending,
    isError,
    error,
    count: data?.length ?? 0,
  };
}
