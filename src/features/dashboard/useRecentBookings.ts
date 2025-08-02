import { getBookingsAfterDate } from "@/services/apiBookings";
import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();
  const numDays = !searchParams ? 7 : Number(searchParams.get("last"));
  const queryDay = subDays(new Date(), numDays).toISOString();

  const { data: bookings = [], isPending } = useQuery({
    queryKey: [`bookings, last-${numDays}`],
    queryFn: () => getBookingsAfterDate(queryDay),
  });

  return { bookings, isPending };
}
