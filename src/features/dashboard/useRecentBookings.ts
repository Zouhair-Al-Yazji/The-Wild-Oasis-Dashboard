import { getBookingsAfterDate } from "@/services/apiBookings";
import { calculateTrend } from "@/utils/helpers";
import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();
  const numDays = searchParams.get("last")
    ? Number(searchParams.get("last"))
    : 7;
  const prevNumDays = numDays;

  const currentEndDate = new Date();
  const currentStartDate = subDays(currentEndDate, numDays);

  const previousEndDate = currentStartDate;
  const previousStartDate = subDays(previousEndDate, prevNumDays);

  const { data: currentBookings = [], isPending } = useQuery({
    queryKey: ["bookings", `last-${numDays}`],
    queryFn: () => getBookingsAfterDate(currentStartDate.toISOString()),
  });

  const { data: previousBookings = [] } = useQuery({
    queryKey: ["bookings", `prev-${prevNumDays}`],
    queryFn: () => getBookingsAfterDate(previousStartDate.toISOString()),
    enabled: !isPending,
  });

  const currentSales = currentBookings.reduce(
    (acc, cur) => acc + cur.totalPrice,
    0,
  );
  const previousSales = previousBookings.reduce(
    (acc, cur) => acc + cur.totalPrice,
    0,
  );

  return {
    bookings: currentBookings,
    isPending,
    metrics: {
      bookings: {
        current: currentBookings.length,
        previous: previousBookings.length,
        trend: calculateTrend(currentBookings.length, previousBookings.length),
      },
      sales: {
        current: currentSales,
        previous: previousSales,
        trend: calculateTrend(currentSales, previousSales),
      },
    },
  };
}
