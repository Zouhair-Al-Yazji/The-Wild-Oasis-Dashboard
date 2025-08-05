import { getBookingsAfterDate } from "@/services/apiBookings";
import { calculatePercentageChange, calculateTrend } from "@/utils/helpers";
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

  const currentTotalSales = currentBookings.reduce(
    (acc, cur) => acc + cur.totalPrice,
    0,
  );
  const currentExtrasSales = currentBookings.reduce(
    (acc, cur) => acc + cur.extrasPrice,
    0,
  );

  const previousTotalSales = previousBookings.reduce(
    (acc, cur) => acc + cur.totalPrice,
    0,
  );
  const previousExtrasSales = previousBookings.reduce(
    (acc, cur) => acc + cur.extrasPrice,
    0,
  );

  // Calculate total revenue (combined sales + extras)
  const currentTotalRevenue = currentTotalSales + currentExtrasSales;
  const previousTotalRevenue = previousTotalSales + previousExtrasSales;

  // Calculate percentage change
  const revenueChange = calculatePercentageChange(
    currentTotalRevenue,
    previousTotalRevenue,
  );

  // Calculate trend direction
  const revenueTrend = calculateTrend(
    currentTotalRevenue,
    previousTotalRevenue,
  );

  return {
    bookings: currentBookings,
    isPending,
    metrics: {
      bookings: {
        current: currentBookings.length,
        previous: previousBookings.length,
        trend: calculateTrend(currentBookings.length, previousBookings.length),
        change: calculatePercentageChange(
          currentBookings.length,
          previousBookings.length,
        ),
      },
      sales: {
        total: {
          current: currentTotalSales,
          previous: previousTotalSales,
          trend: calculateTrend(currentTotalSales, previousTotalSales),
          change: calculatePercentageChange(
            currentTotalSales,
            previousTotalSales,
          ),
        },
        extras: {
          current: currentExtrasSales,
          previous: previousExtrasSales,
          trend: calculateTrend(currentExtrasSales, previousExtrasSales),
          change: calculatePercentageChange(
            currentExtrasSales,
            previousExtrasSales,
          ),
        },
        combined: {
          current: currentTotalRevenue,
          previous: previousTotalRevenue,
          trend: revenueTrend,
          change: revenueChange,
        },
      },
    },
  };
}
