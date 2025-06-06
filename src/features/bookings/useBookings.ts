import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import type { Booking } from "./useBooking";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue, method: "eq" as const };

  // SORT
  const sortField = searchParams.get("sortBy") || "startDate";
  const sortDirection = searchParams.get("direction") || "desc";
  const sortBy = { field: sortField, direction: sortDirection };
  // // PAGINATION
  // const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // QUERY
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["bookings", filter, sortBy],
    queryFn: () => getBookings({ filter, sortBy }),
  });

  return { data: data as Booking[] | undefined, isPending, isError, error };
}
