import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import type { Booking } from "./useBooking";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const queryClient = useQueryClient();
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

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const pageSize = !searchParams.get("pageSize")
    ? 5
    : Number(searchParams.get("pageSize"));
  const pagination = { page, pageSize };

  // QUERY
  const {
    data: { data, count } = {},
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, pagination],
    queryFn: () => getBookings({ filter, sortBy, pagination }),
  });

  // PRE-FETCHING
  const pageCount = Math.ceil((count ?? 0) / pageSize);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, { page: page + 1, pageSize }],
      queryFn: () =>
        getBookings({
          filter,
          sortBy,
          pagination: { page: page + 1, pageSize },
        }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, { page: page - 1, pageSize }],
      queryFn: () =>
        getBookings({
          filter,
          sortBy,
          pagination: { page: page - 1, pageSize },
        }),
    });
  }

  return {
    data: data as Booking[] | undefined,
    isPending,
    isError,
    error,
    count,
  };
}
