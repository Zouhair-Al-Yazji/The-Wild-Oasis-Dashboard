import { getStaysAfterDate } from "@/services/apiBookings";
import { calculatePercentageChange, calculateTrend } from "@/utils/helpers";
import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";

export function useRecentStays() {
  const [searchParams] = useSearchParams();
  const numDays = searchParams.get("last")
    ? Number(searchParams.get("last"))
    : 7;
  const prevNumDays = numDays;

  const currentEndDate = new Date();
  const currentStartDate = subDays(currentEndDate, numDays);

  const previousEndDate = currentStartDate;
  const previousStartDate = subDays(previousEndDate, prevNumDays);

  const { data: currentStays = [], isPending } = useQuery({
    queryKey: ["stays", `last-${numDays}`],
    queryFn: () => getStaysAfterDate(currentStartDate.toISOString()),
  });

  const { data: previousStays = [] } = useQuery({
    queryKey: ["stays", `prev-${prevNumDays}`],
    queryFn: () => getStaysAfterDate(previousStartDate.toISOString()),
    enabled: !isPending,
  });

  const currentConfirmed = currentStays.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out",
  );
  const previousConfirmed = previousStays.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out",
  );

  const currentNights = currentConfirmed.reduce(
    (acc, stay) => acc + (stay.numNights || 0),
    0,
  );
  const previousNights = previousConfirmed.reduce(
    (acc, stay) => acc + (stay.numNights || 0),
    0,
  );

  return {
    confirmedStays: currentConfirmed,
    isPending,
    numDays,
    metrics: {
      checkIns: {
        current: currentConfirmed.length,
        previous: previousConfirmed.length,
        trend: calculateTrend(
          currentConfirmed.length,
          previousConfirmed.length,
        ),
        change: calculatePercentageChange(
          currentConfirmed.length,
          previousConfirmed.length,
        ),
      },
      occupancy: {
        current: currentNights,
        previous: previousNights,
        trend: calculateTrend(currentNights, previousNights),
        change: calculatePercentageChange(currentNights, previousNights),
      },
    },
  };
}
